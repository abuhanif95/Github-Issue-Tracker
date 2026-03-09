const allIssueBtn = document.getElementById("all-issue-btn");
const issueCardsContainer = document.getElementById("issue-cards");

async function loadAllIssueCards() {
  const response = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await response.json();
  displayCards(data.data);
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
                return `<button class="btn btn-soft btn-neutral h-6 rounded-full mr-1">${label}</button>`;
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

allIssueBtn.addEventListener("click", loadAllIssueCards);
