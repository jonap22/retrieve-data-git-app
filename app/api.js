function getURL() {
    return "https://api.github.com/orgs/stackbuilders/repos";
}

async function getFormattedData(responseData) {
    return responseData
        .map(repo => {
            const { stargazers_count, description, name, created_at, url } = repo;
            return { stargazers_count, description, name, created_at, url };
        });
}

async function retrieveDataFromAPI() {
    let response = await fetch(getURL());

    if (!response.ok) {
        return alert("HTTP-Error: " + response.status);
    }

    let json = await response.json();
    let myRepos = await getFormattedData(json);

    return myRepos;
}

function concatRankedReposOnHTML(data, htmlOutput) {
    data
        .filter(repo => repo.stargazers_count > 5)
        .map(repo => {
            htmlOutput += `
            <ul class="list-group mb-3 mx-auto">
                <li class="list-group-item"><strong>Repository name:</strong> ${repo.name}</li>
                <li class="list-group-item"><strong>Created on:</strong> ${getFormattedDate(repo.created_at)}</li>
                <li class="list-group-item"><strong>Description:</strong> ${repo.description}</li>
                <li class="list-group-item"><strong>Stars number:</strong> ${repo.stargazers_count}</li>
                <li class="list-group-item"><strong>Repo URL:</strong> ${repo.url}</li>
            </ul>
        `
        });

    document.getElementById('repositoryContent').innerHTML = htmlOutput;
}

async function setRankedReposOnScreen() {
    let htmlOutput = "<h2 class='mb-4'>Best Repositories</h2>";
    let bestRepos = Object.assign([], await retrieveDataFromAPI());
    concatRankedReposOnHTML(bestRepos, htmlOutput);
}

function getFormattedDate(date) {
    return date.replace('T', ' at ').replace('Z', '');
}

function concatLatestReposOnHTML(data, htmlOutput) {
    // Sort repositories based on the created_at attribute in descending order (latest first)
    const sortedRepos = data.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
    const latestRepos = sortedRepos.slice(0, 5);
    latestRepos
        .map(repo => {
            htmlOutput += `
            <ul class="list-group mb-3 mx-auto">
                <li class="list-group-item"><strong>Repository name:</strong> ${repo.name}</li>
                <li class="list-group-item"><strong>Created on:</strong> ${getFormattedDate(repo.created_at)}</li>
                <li class="list-group-item"><strong>Description:</strong> ${repo.description}</li>
                <li class="list-group-item"><strong>Stars number:</strong> ${repo.stargazers_count}</li>
                <li class="list-group-item"><strong>Repo URL:</strong> ${repo.url}</li>
            </ul>
        `
        });

    document.getElementById('repositoryContent').innerHTML = htmlOutput;
}

async function setLatestReposOnScreen() {
    let htmlOutput = "<h2 class='mb-4'>Latest Repositories</h2>";
    let latestRepos = Object.assign([], await retrieveDataFromAPI());
    concatLatestReposOnHTML(latestRepos, htmlOutput);
}

function concatTotalStarsOnHTML(data, htmlOutput) {
    let total = sumRepositoriesStars(data);

    htmlOutput += `
    <div class="card card-body mb-3">
        <p><strong>Total Stars:</strong> ${total}</p>
    </div>
    `

    document.getElementById('repositoryContent').innerHTML = htmlOutput;
}

function sumRepositoriesStars(data) {
    return data.reduce((total, { stargazers_count }) => {
        return total += stargazers_count;
    }, 0);
}

async function setTotalStarsOnScreen() {
    let htmlOutput = "<h2 class='mb-4'>All Obtained Stars</h2>";
    let repos = Object.assign([], await retrieveDataFromAPI());
    concatTotalStarsOnHTML(repos, htmlOutput);
}

module.exports = {
    sumRepositoriesStars,
    getFormattedData,
    getFormattedDate
};