import fs from 'fs/promises';

const API_URL = 'https://6994c147b081bc23e9c140ad.mockapi.io/habits'

async function seed() {
    try {
        const file = await fs.readFile(new URL('../data/initialData.json', import.meta.url));
        let data = JSON.parse(file)

        const existingResponse = await fetch(API_URL)
        const existingData = await existingResponse.json()

        if (existingData.length > 0) {
            console.log('Data already exists. Skipping seeding.')
            return
        }

        if (!Array.isArray(data)) {
            data = [data]
        }

        for (const item of data) {
            await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(item)
            })
            console.log("ITEM:", item)
        }

        console.log('Data seeding completed!')
    } catch (error) {
        console.log('Seeding error: ', error)
    }
}

seed()