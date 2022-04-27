const { filterByQuery, findById, createNewZookeeper, validateZookeeper } = require('../lib/zookeepers');
const { zookeepers } = require('../data/zookeepers.json');

jest.mock('fs');

test("filters by query", () => {
    const startingZookeepers = [
        {
            "id": "3",
            "name": "Linda",
            "age": 48,
            "favoriteAnimal": "otter"
        },
        {
            "id": "4",
            "name": "Ryan",
            "age": 20,
            "favoriteAnimal": "dog"
        }
    ]

    const updatedZookeepers = filterByQuery({ "name": "Linda" }, startingZookeepers);

    expect(updatedZookeepers.length).toEqual(1);
});

test("finds by id", () => {
    const startingZookeepers = [
        {
            "id": "3",
            "name": "Linda",
            "age": 48,
            "favoriteAnimal": "otter"
        },
        {
            "id": "4",
            "name": "Ryan",
            "age": 20,
            "favoriteAnimal": "dog"
        }
    ]

    const result = findById("4", startingZookeepers);

    expect(result.name).toBe("Ryan");
});

test("creates a zookeeper object", () => {
    const zookeeper = createNewZookeeper(
        { "id": "ddkdjdjj", "name": "Yuri" },
        zookeepers
    );

    expect(zookeeper.id).toBe("ddkdjdjj");
    expect(zookeeper.name).toBe("Yuri");
});

test("validates age", () => {
    const zookeeper = {
        "id": "3",
        "name": "Linda",
        "age": 48,
        "favoriteAnimal": "otter"
    }

    const invalidZookeeper = {
        "id": "3",
        "name": "Linda",
        "age": "48",
        "favoriteAnimal": "otter"
    }

    const result1 = validateZookeeper(zookeeper);
    const result2 = validateZookeeper(invalidZookeeper);

    expect(result1).toBe(true);
    expect(result2).toBe(false);
});
