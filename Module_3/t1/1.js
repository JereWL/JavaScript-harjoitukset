// Get the element with id="target"
const target = document.getElementById("target");

// Add HTML using innerHTML property
target.innerHTML = `
    <li>First item</li>
    <li>Second item</li>
    <li>Third item</li>
`;

// Add class my-list (already in HTML, but you can also add it with JavaScript like this:)
target.classList.add("my-list");
