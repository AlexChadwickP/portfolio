window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    /* let githubReposURL = "https://api.github.com/users/AlexChadwickP/repos";


const repoOneNameTag = document.getElementById("repo-one-name");
const repoOneDescriptionTag = document.getElementById("repo-one-description");

let repoOneName = "";
let repoOneDesc = "";

fetch(githubReposURL)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        info = data[0];
        console.log(data[0]);
        repoOneNameTag.innerText = info.name;
        repoOneDescriptionTag.innerText = info.description;
    })
    .catch((err) => {
        console.log(err);
    }); */

    let githubReposURL = "https://api.github.com/users/AlexChadwickP/repos";


    function createRepoCard(repoName, repoDescription, repoLink) {
        let card = document.createElement("div");
        card.classList.add("card");
        card.classList.add("mt-5");

        let cardContent = document.createElement("div");
        cardContent.classList.add("card-content");

        let cardHeader = document.createElement("header");
        cardContent.classList.add("card-header");

        let title = document.createElement("p");
        title.classList.add("card-header-title")
        title.appendChild(document.createTextNode(repoName));

        cardHeader.appendChild(title);

        card.append(cardHeader);

        let subtitle = document.createElement("p");
        subtitle.classList.add("subtitle");
        subtitle.appendChild(document.createTextNode(repoDescription));

        cardContent.appendChild(subtitle);

        card.appendChild(cardContent);

        let cardFooter = document.createElement("footer");
        cardFooter.classList.add("card-footer");

        let cardFooterItem = document.createElement("p");
        cardFooterItem.classList.add("card-footer-item");
        let cardFooterItemSpan = document.createElement("span");
        let cardFooterRepoLink = document.createElement("a");
        cardFooterRepoLink.href = repoLink;
        cardFooterRepoLink.innerText = "Link";

        cardFooterItemSpan.appendChild(cardFooterRepoLink);
        cardFooterItem.appendChild(cardFooterItemSpan);
        cardFooter.append(cardFooterItem);
        card.append(cardFooter);

        return card;
    }

    let content = document.getElementById("content");

    let githubRepos;

    fetch(githubReposURL)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data);
            console.log(data[0]);
            console.log(data[0].name);
            for (let i = 0; i < data.length; i++) {
                content.appendChild(createRepoCard(data[i].name, data[i].description, data[i].html_url));
            }
        })
        .catch((err) => {
            console.log(err);
        });

    if (githubRepos) {
        console.log(githubRepos.length);


    }


});