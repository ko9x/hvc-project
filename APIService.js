export function getItems() {
    fetch('http://localhost:8080/api/item/F9XX').then((response) => {
    return response.json();
}).then((data) => {
    console.log(data);
}).catch((error) => {
    console.log('Something went wrong', error); //@DEBUG
})
}
