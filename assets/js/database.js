// Database structure
const database = [{
    product: [
        {
            id: 1,
            name: "ป้ายไวนิล",
            description: "This is the description for product 1",
            image: "https://scontent.furt1-1.fna.fbcdn.net/v/t39.30808-6/493224171_1257509799710870_3998754824460229343_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFfA7Lcgcn8xoEsmy-HS9V61Fd8y0Q1EcrUV3zLRDURyprUcX9aA-F2pVCkkgKhmbhLlKqKgHkO2ifUmsPHsAoP&_nc_ohc=-qWIC_mB98MQ7kNvwFLcc7S&_nc_oc=AdnEuXIGe-YOWB4jvPOoXWfJPknYOSwDV1q3CgdCwzae3DgtzqwOOOqXAtSAnqPFy6Y&_nc_zt=23&_nc_ht=scontent.furt1-1.fna&_nc_gid=JAQpGqLqar-fQvf5qlYgzg&oh=00_AfPgEIH7tgtfGbMaY_HMc3koOSR_mR53e9p4x3GNz3eFIQ&oe=684884BF"
        },
        {
            id: 2,
            name: "ป้ายคอมโพสิท",
            description: "This is the description for product 2",
            image: "https://scontent.furt1-1.fna.fbcdn.net/v/t39.30808-6/500407055_1285581083570408_7088848512085273310_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFuQCMteDbzLQhGWKvF1xTG6vBlPnYkNu_q8GU-diQ27xsdWq5t3BGM8wzBGuqoifxKzHWJKReLMWiqmWfBc80h&_nc_ohc=drWCuNKhgrcQ7kNvwFWhLsD&_nc_oc=AdnbZROuBeT5t5zIV9FVxpcTJyubueZ2vLiDosHb5piMdwMW3e6-5VaiW047IaN9Qho&_nc_zt=23&_nc_ht=scontent.furt1-1.fna&_nc_gid=HoVARG8Q8wf72y_cdhWrXQ&oh=00_AfP3nsp_8s0b8DB8PM9S72pLMGBBPY-0TWSuWeuSP8OrfA&oe=6848622D"
        },
        {
            id: 3,
            name: "สติ๊กเกอร์",
            description: "This is the description for product 3",
            image: "https://scontent.furt1-1.fna.fbcdn.net/v/t39.30808-6/494696751_1265239628937887_4656346572623055493_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFaJq3X8JlC-xhLETpT5ULMGeTYHL7rdUUZ5Ngcvut1RR0XCBuESlmYikS1inXSxY3exnOOgeu3uK5gtdM8nWn0&_nc_ohc=TV44ndBL8dEQ7kNvwEUWo3q&_nc_oc=Adl5SAN1TpouLR90OfhCM1ySqMah7tZrUP44mhEO4Tcn9FxqRd4vysEyimqhJyVnr68&_nc_zt=23&_nc_ht=scontent.furt1-1.fna&_nc_gid=Pg39Zso4EzX1P9-tP9DArw&oh=00_AfN-Hc3dd_Vq8lEz4w2yHyChdV0OmwT9sUJvRmunh205Gg&oe=68486FC7"
        },
        {
            id: 4,
            name: "ตู้ไฟ",
            description: "This is the description for product 4",
            image: "https://scontent.furt1-1.fna.fbcdn.net/v/t39.30808-6/492098421_1256816253113558_4287901652510047720_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGQIWvG4S8QrekCfIqqcER7ovTH0UhpAUui9MfRSGkBS4XFCQP3-V7_FBvdAilpSD_XZk6XxAw8Zpc6hBxVWWY0&_nc_ohc=QlOi4JTqfo8Q7kNvwG2qNik&_nc_oc=Adl6WwUqR-o8LlVedBot-GkKx7XA-m6JnOo_IgPkdRjFTXnXmtHMuyN9MclZBAbRUCU&_nc_zt=23&_nc_ht=scontent.furt1-1.fna&_nc_gid=bgVEZPu4CCIRHL4oAKyEQA&oh=00_AfOSHVklvzeY8wwOUhpf7bScu66z9WdoWP7_e6LnslCxWQ&oe=68489ACA"
        },
        {
            id: 5,
            name: "ตัวอักษร",
            description: "This is the description for product 5",
            image: "https://scontent.furt1-1.fna.fbcdn.net/v/t39.30808-6/490799189_1249457817182735_6309501194733419348_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEh6I8KXT3Vf-aTE94irnlogFlTwCfxvUaAWVPAJ_G9RtAxtIeH_VeTBYirl7O6cL_NjEyeUzeOp6UR3jx6jO0S&_nc_ohc=6q9Z2v81CP8Q7kNvwF5v8jz&_nc_oc=AdkostTGeM78OXqtdk-HmCywTVzu2JKXrb0918Hg3W05dpQHxTMCE-2j9_Ka50nG8sM&_nc_zt=23&_nc_ht=scontent.furt1-1.fna&_nc_gid=4bzGmydJB5arvTSCkwfNrw&oh=00_AfMj2N1rZtI9xHtCzfmH_3ETU4Jy8MAHalq5TdqW-6jdug&oe=6848782A"
        },
        {
            id: 6,
            name: "งานตกแต่งเวที",
            description: "This is the description for product 6",
            image: "https://scontent.furt1-1.fna.fbcdn.net/v/t39.30808-6/493289911_1257062233088960_2944320129250187967_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeG2YFH9o-wjZ6eeiidT4uLCOJQ-h4Hwcis4lD6HgfByK5ubo34TMCK3sCTjXrwoN_ZD6Yz1EpLy1TE5Gj6vNc--&_nc_ohc=4ThRXg9_jVQQ7kNvwFNgY2z&_nc_oc=AdmDCHCtfDw5afm2TTFW0raRk-2yMPYyti0sTTpwiuIY3sKGNi2Bvm7j7M-CM_5O9uk&_nc_zt=23&_nc_ht=scontent.furt1-1.fna&_nc_gid=tVv8n9Np7E4RLJu8sCpwgQ&oh=00_AfO7shcrFE6Ax-hPxaich145tmRGf-w5O1CZ59qko8M9KA&oe=6848AA48"
        },
        {
            id: 7,
            name: "ป้ายไฟวิ่ง",
            description: "This is the description for product 7",
            image: "https://scontent.furt1-1.fna.fbcdn.net/v/t39.30808-6/481466298_1207512928043891_925472021378887165_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFfA7Lcgcn8xoEsmy-HS9V61Fd8y0Q1EcrUV3zLRDURyprUcX9aA-F2pVCkkgKhmbhLlKqKgHkO2ifUmsPHsAoP&_nc_ohc=q0-00-00000Q7kNvwFWhLsD&_nc_oc=AdnbZROuBeT5t5zIV9FVxpcTJyubueZ2vLiDosHb5piMdwMW3e6-5VaiW047IaN9Qho&_nc_zt=23&_nc_ht=scontent.furt1-1.fna&_nc_gid=HoVARG8Q8wf72y_cdhWrXQ&oh=00_AfP3nsp_8s0b8DB8PM9S72pLMGBBPY-0TWSuWeuSP8OrfA&oe=6848622D"
        },
        {
            id: 8,
            name: "ธงปีกนก",
            description: "This is the description for product 8",
            image: "https://scontent.furt1-1.fna.fbcdn.net/v/t39.30808-6/482019841_1215542430574274_2618415055060010152_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGZrocW_-YzkSwbAe7tVXUTZEKWu21yyTtkQpa7bXLJO46Doxk1f9zl_sGm4rj20UZ3uUGHzY0-8a0buljxnipw&_nc_ohc=InZlAiRC1z4Q7kNvwFphcLB&_nc_oc=AdmkZN_dCO8XSPVFw58RhBZ2bKWWPM17-NLuWZZSCbT61ZcI6D17c0aVU5J6HZRdRtI&_nc_zt=23&_nc_ht=scontent.furt1-1.fna&_nc_gid=rLi8s_eDje6Fmo6uPq1oyg&oh=00_AfPrbqi6Xgr60dULaky8QXYcTXWvjKcIWhuTArBS6iQBjA&oe=6848A6E8"
        },
        {
            id: 9,
            name: "โลโก้",
            description: "This is the description for product 9",
            image: "https://scontent.furt1-1.fna.fbcdn.net/v/t39.30808-6/492337803_1257589126369604_4595604356537134835_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFecYwd7daM-0aCRSoDpAE_aOdeBrCv4S9o514GsK_hL8_C0DQLReDj1kEMQHaJ-bvWJuDVSuAnr5WCTVvv9GI3&_nc_ohc=4RXiUzGUPZYQ7kNvwEncRwa&_nc_oc=AdmYezl_igKf1MMrzWwQAdfhli7TEEFS5ZtsFUuP-K7748KJ0cvgMwJRzm-Gu9hhI4E&_nc_zt=23&_nc_ht=scontent.furt1-1.fna&_nc_gid=iaoVd--V4U0GQL6nV4_KxQ&oh=00_AfM6ohB5T5-On3DJUsZOrFKuXg2XiGKEeKirDqLoIB35bA&oe=68489077"
        },
        {
            id: 10,
            name: "งานโครงสร้างและติดตั้ง",
            description: "This is the description for product 10",
            image: "https://scontent.furt1-1.fna.fbcdn.net/v/t39.30808-6/487298664_1231025042359346_6177375653686449751_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHYjdKOkow7GNz0Fyk2CjKwPb-T8vndJgg9v5Py-d0mCGQKzprXlI-2JeVdheopYQEbKTa_68f-JE_Z7W4NHs8Q&_nc_ohc=Ejfy1LCphOYQ7kNvwEHS5mc&_nc_oc=AdlhyxAe1XRNHwvO8x4dh7sNBmHdLmbHJZP55kODzmZ8ZW2tbUgxrvpV_MChwM21rlQ&_nc_zt=23&_nc_ht=scontent.furt1-1.fna&_nc_gid=9_n8wAauJACxCVYKpafhvg&oh=00_AfMbsaOzU773tdrV3NKJWUpdm0z-ZTUSvIavT2OJ4_eXWg&oe=6848AB7D"
        }
    ]
}];

// Functions to interact with the database
const db = {
    getAll: () => database,

    getById: (id) => database.find(item => item.id === id),
};

// console.log(db.getAll()); // Get all items
// console.log(db.getById(1)); // Get item with id 1
module.exports = db; 