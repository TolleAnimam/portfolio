const sunIcon = document.querySelector("#sun-icon")
const moonIcon = document.querySelector("#moon-icon")


function setTheme(themeToSet) {
    const allElements = document.querySelectorAll("*");
    const body = document.querySelector("body");
    if(body.dataset.theme !== themeToSet) {
        allElements.forEach(el => {
            if (el.dataset.theme !== undefined) {
                el.dataset.theme = `${themeToSet}`;
            }
        });
    }
}

if (theme === "dark") {
    setTheme(theme);
} else if (theme === "light") {
    setTheme(theme);
}

sunIcon.addEventListener("click", () => {
    setTheme("light");
    theme = "light";
})

moonIcon.addEventListener("click", () => {
    setTheme("dark");
    theme = "dark";
})