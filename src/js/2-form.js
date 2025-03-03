const form = document.querySelector(".feedback-form");

const LOCAL_STORAGE_KEY = "feedback-form-state";

const saveToLocalStorage = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error("You have a problem with saving data", error);
    
    }
};

const getFromLocalStorage = (key) => {
    const defaultValue = {};
    try {
        return JSON.parse(localStorage.getItem(key)) ?? defaultValue;
    } catch (error) {
        console.error("You have a problem with retriving data", error);
        return defaultValue;
    }

};

let formData = getFromLocalStorage(LOCAL_STORAGE_KEY) || {};

const checkLocalStorage = () => {
    if (!formData || Object.keys(formData).length === 0) return;
    if (form.elements.email) form.elements.email.value = formData.email || '';
    if (form.elements.message) form.elements.message.value = formData.message || '';
  };

form.addEventListener("input", ({ target: {name, value}}) => {
    formData[name] = value.trim();
    saveToLocalStorage(LOCAL_STORAGE_KEY, formData);
});

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const {email, message} = formData;

    if (!email || !message) {
        alert("Fill all fields, please!");
        return;
    }

    console.log("Form submitted:", formData);

    form.reset();
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    formData = {};
});

