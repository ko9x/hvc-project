export async function getItems(config) {
    let response = await fetch(`http://localhost:8080/api/item/${config}`);

    let data = await response.json();

    if(data?.success) {
        return data.items;
    }
}