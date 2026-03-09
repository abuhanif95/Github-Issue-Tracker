const allIssueBtn = document.getElementById("all-issue-btn");
const openIssueBtn = document.getElementById("open-issue-btn");
const closedIssueBtn = document.getElementById("closed-issue-btn");
const issueCardsContainer = document.getElementById("issue-cards");
const issueCount = document.getElementById("issue-count");
const spinner = document.getElementById("spinner");

setActiveBtn(allIssueBtn);

allIssueBtn.addEventListener("click", () => {
  setActiveBtn(allIssueBtn);
  loadAllIssueCards();
});

openIssueBtn.addEventListener("click", () => {
  setActiveBtn(openIssueBtn);
  loadOpenIssueCards();
});

closedIssueBtn.addEventListener("click", () => {
  setActiveBtn(closedIssueBtn);
  loadClosedIssueCards();
});

function setActiveBtn(activeBtn) {
  allIssueBtn.classList.remove("btn-primary");
  openIssueBtn.classList.remove("btn-primary");
  closedIssueBtn.classList.remove("btn-primary");

  activeBtn.classList.add("btn-primary");
}

function showSpinner() {
  spinner.classList.remove("hidden");
  issueCardsContainer.innerHTML = "";
}

function hideSpinner() {
  spinner.classList.add("hidden");
}

function updateIssueCount(count) {
  if (issueCount) {
    issueCount.textContent = count;
  }
}

async function loadAllIssueCards() {
  showSpinner();
  const response = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await response.json();
  updateIssueCount(data.data.length);
  displayCards(data.data);
  hideSpinner();
}

async function loadOpenIssueCards() {
  showSpinner();
  const response = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await response.json();
  const openIssues = data.data.filter((issue) => issue.status === "open");
  updateIssueCount(openIssues.length);
  displayCards(openIssues);
  hideSpinner();
}

async function loadClosedIssueCards() {
  showSpinner();
  const response = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await response.json();
  const closedIssues = data.data.filter((issue) => issue.status === "closed");
  updateIssueCount(closedIssues.length);
  displayCards(closedIssues);
  hideSpinner();
}

function getLabelColor(label) {
  const labelColors = {
    bug: "bg-red-100 text-red-700 border-red-200",
    "help wanted": "bg-purple-100 text-purple-700 border-purple-200",
    enhancement: "bg-green-100 text-green-700 border-green-200",
    documentation: "bg-blue-100 text-blue-700 border-blue-200",
    "good first issue": "bg-yellow-100 text-yellow-700 border-yellow-200",
  };

  return labelColors[label.toLowerCase()];
}

function displayCards(issues) {
  issueCardsContainer.innerHTML = "";
  issues.forEach((issue) => {
    const card = document.createElement("div");
    const topBorderColor =
      issue.status === "open" ? "border-t-green-600" : "border-t-purple-600";
    card.className = `bg-white rounded-md border-t-3 min-w-[270px] shadow ${topBorderColor} space-y-2`;

    const createdDate = new Date(issue.createdAt).toLocaleDateString();
    const updatedDate = new Date(issue.updatedAt).toLocaleDateString();

    const priorityColor =
      issue.priority === "high"
        ? "btn-error"
        : issue.priority === "medium"
          ? "btn-warning"
          : "btn-info";

    const statusIcon =
      issue.status === "open"
        ? "./assets/Open-Status.png"
        : "./assets/Closed-Status.png";

    card.innerHTML = `
      <!-- Card top -->
      <div class="w-full p-3 mb-3 space-y-3">
        <div class="flex justify-between items-center">
          <img src="${statusIcon}" class="w-5 h-5" alt="${issue.status}" />
          <button class="btn btn-soft ${priorityColor} rounded-full h-6">
            ${issue.priority.toUpperCase()}
          </button>
        </div>

        <!-- title, description and labels -->
        <div class="flex gap-2 flex-col">
          <h2 class="text-[18px] font-medium">
            ${issue.title}
          </h2>
          <p class="text-gray-600">
            ${issue.description}
          </p>
          <div>
            ${issue.labels
              .map(function (label) {
                const labelColor = getLabelColor(label);
                return `<button class="btn ${labelColor} border rounded-full h-6 text-xs px-2 mr-1 mb-1">${label}</button>`;
              })
              .join("")}
          </div>
        </div>
      </div>

      <!-- Divider line -->
      <div class="w-full h-[.5px] bg-gray-300"></div>

      <!-- Card footer -->
      <div class="p-3 text-xs">
        <div class="flex justify-between">
          <p class="text-gray-600">#${issue.id} by ${issue.author}</p>
          <p class="text-gray-600">${createdDate}</p>
        </div>

        <div class="flex justify-between">
          <p class="text-gray-600">Assignee: ${issue.assignee}</p>
          <p class="text-gray-600">Updated: ${updatedDate}</p>
        </div>
      </div>
    `;

    issueCardsContainer.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", loadAllIssueCards);
