// ฐานข้อมูล
const database = [
    {
        id: 1,
        name: "สินค้า 1",
        description: "รายละเอียดสินค้า 1",
        image: "product1.jpg"
    },
    {
        id: 2,
        name: "สินค้า 2",
        description: "รายละเอียดสินค้า 2",
        image: "product2.jpg"
    },
    {
        id: 3,
        name: "สินค้า 3",
        description: "รายละเอียดสินค้า 3",
        image: "product3.jpg"
    }
];

// ฟังก์ชันสำหรับจัดการฐานข้อมูล
const db = {
    // ดึงข้อมูลทั้งหมด
    getAll: function() {
        return database;
    },

    // ดึงข้อมูลตาม id
    getById: function(id) {
        return database.find(item => item.id === id);
    },

    // เพิ่มข้อมูลใหม่
    add: function(item) {
        const newId = database.length > 0 ? Math.max(...database.map(item => item.id)) + 1 : 1;
        const newItem = { ...item, id: newId };
        database.push(newItem);
        return newItem;
    },

    // อัพเดทข้อมูล
    update: function(id, updatedItem) {
        const index = database.findIndex(item => item.id === id);
        if (index !== -1) {
            database[index] = { ...database[index], ...updatedItem };
            return database[index];
        }
        return null;
    },

    // ลบข้อมูล
    delete: function(id) {
        const index = database.findIndex(item => item.id === id);
        if (index !== -1) {
            const deletedItem = database[index];
            database.splice(index, 1);
            return deletedItem;
        }
        return null;
    }
};

// ตัวอย่างการใช้งาน:
/*
// ดึงข้อมูลทั้งหมด
console.log(db.getAll());

// ดึงข้อมูลตาม id
console.log(db.getById(1));

// เพิ่มข้อมูลใหม่
db.add({
    name: "สินค้าใหม่",
    description: "รายละเอียดสินค้าใหม่",
    image: "new.jpg"
});

// อัพเดทข้อมูล
db.update(1, {
    name: "ชื่อที่อัพเดทแล้ว"
});

// ลบข้อมูล
db.delete(1);
*/ 