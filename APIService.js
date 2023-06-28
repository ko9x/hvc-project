export async function getItems() {
    let response = await fetch('http://localhost:8080/api/item/F9XX');

    let data = await response.json();

    if(data?.success) {
        return data.items;
    }
}