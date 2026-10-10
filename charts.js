/**
 * Smart Student Expense Tracker - Chart.js Rendering Engine
 */

let monthlyChartInstance = null;
let categoryChartInstance = null;
let trendChartInstance = null;

async function renderDashboardCharts() {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  const textColor = isDark ? "#94a3b8" : "#64748b";
  const gridColor = isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.05)";

  try {
    const res = await fetch("/api/chart-data");
    if (!res.ok) return;
    const data = await res.json();

    // 1. Monthly Income vs Expense Chart
    const monthlyCtx = document.getElementById("monthlyChart");
    if (monthlyCtx) {
      if (monthlyChartInstance) monthlyChartInstance.destroy();

      monthlyChartInstance = new Chart(monthlyCtx, {
        type: "bar",
        data: {
          labels: data.monthly.labels,
          datasets: [
            {
              label: "Income",
              data: data.monthly.income,
              backgroundColor: "#10b981",
              borderRadius: 6,
              barPercentage: 0.6,
            },
            {
              label: "Expenses",
              data: data.monthly.expense,
              backgroundColor: "#ef4444",
              borderRadius: 6,
              barPercentage: 0.6,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: { color: textColor, font: { weight: "600", size: 12 } },
            },
            tooltip: {
              callbacks: {
                label: function (ctx) {
                  return ` ${ctx.dataset.label}: ${ctx.raw.toLocaleString()}`;
                },
              },
            },
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: textColor, font: { size: 11 } },
            },
            y: {
              grid: { color: gridColor },
              ticks: { color: textColor, font: { size: 11 } },
            },
          },
        },
      });
    }

    // 2. Category Pie/Doughnut Chart
    const categoryCtx = document.getElementById("categoryChart");
    if (categoryCtx) {
      if (categoryChartInstance) categoryChartInstance.destroy();

      const hasData = data.categories.totals && data.categories.totals.length > 0;
      categoryChartInstance = new Chart(categoryCtx, {
        type: "doughnut",
        data: {
          labels: hasData ? data.categories.labels : ["No Expenses Recorded"],
          datasets: [
            {
              data: hasData ? data.categories.totals : [1],
              backgroundColor: hasData
                ? data.categories.colors
                : [isDark ? "#334155" : "#e2e8f0"],
              borderWidth: 2,
              borderColor: isDark ? "#111827" : "#ffffff",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: "70%",
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                color: textColor,
                boxWidth: 12,
                font: { size: 11, weight: "500" },
              },
            },
          },
        },
      });
    }

    // 3. 14-Day Spending Trend Line Chart (if present on analysis/reports)
    const trendCtx = document.getElementById("dailyTrendChart");
    if (trendCtx && data.daily_trend) {
      if (trendChartInstance) trendChartInstance.destroy();

      trendChartInstance = new Chart(trendCtx, {
        type: "line",
        data: {
          labels: data.daily_trend.labels,
          datasets: [
            {
              label: "Daily Spend",
              data: data.daily_trend.values,
              borderColor: "#059669",
              backgroundColor: "rgba(5, 150, 105, 0.1)",
              fill: true,
              tension: 0.35,
              pointRadius: 4,
              pointBackgroundColor: "#059669",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: textColor, font: { size: 10 } },
            },
            y: {
              grid: { color: gridColor },
              ticks: { color: textColor, font: { size: 10 } },
            },
          },
        },
      });
    }
  } catch (err) {
    console.error("Failed to load charts:", err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderDashboardCharts();
});
