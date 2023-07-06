const API = 'http://localhost:8080/api/item'

export async function getItems(config) {
    let response = await fetch(`${API}/${config}`);

    let data = await response.json();

    if(data?.success) {
        return data.items;
    }
}

export async function storeItem(data) {
    let response = await fetch(`${API}`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const content = await response.json();

    if(content?.success) {
        alert(`Item: ${data.name} has been stored successfully`);
    } else {
        alert(`Something went wrong`);
    }
}
