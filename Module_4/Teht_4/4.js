const placeHolder = "https://placehold.co/210x295?text=Not%20Found";
document.getElementById('searchForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const query = document.getElementById('query').value;
    const response = await fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`);
    const data = await response.json();
    document.querySelectorAll("article").forEach(element => element.remove());
    console.log(data);
    for (let i = 0; i < data.length; i++) {
        const show = data[i].show;
        const showInfo = document.createElement("article");

        const name = document.createElement("h2");
        name.textContent = show.name;

        const link = document.createElement("a");
        link.href = show.url;
        link.textContent = "Show Details";
        link.target = "_blank";

        const image = document.createElement("img");
        if (show.image) {
            image.src = show.image.medium;
        } else {
            image.src = placeHolder;
        }
        image.alt = show.name;

        const summary = document.createElement("div");
        summary.innerHTML = show.summary;

        showInfo.appendChild(name);
        showInfo.appendChild(link);
        showInfo.appendChild(image);
        showInfo.appendChild(summary);
        document.body.appendChild(showInfo);
    }
});
