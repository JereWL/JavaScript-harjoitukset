document.getElementById('jokeForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const query = document.getElementById('query').value;
    const response = await fetch(`https://api.chucknorris.io/jokes/search?query=${encodeURIComponent(query)}`);
    const data = await response.json();
    document.querySelectorAll("article").forEach(element => element.remove());
    console.log(data);
    for (let i = 0; i < data.result.length; i++) {
        const joke = data.result[i];
        const jokeInfo = document.createElement("article");

        const jokeText = document.createElement("p");
        jokeText.textContent = joke.value;

        jokeInfo.appendChild(jokeText);
        document.body.appendChild(jokeInfo);
    }
});
    