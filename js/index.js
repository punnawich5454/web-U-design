
document.addEventListener('DOMContentLoaded', () => {
    class SimpleDatabase {
        constructor() {
            this.data = []
            this.initializeData()
        }

        initializeData() {
            const simpleData = [
                {
                    id: 1,
                    name: "ป้ายไวนิล",
                    description: "ป้ายไวนิลคุณภาพสูง เหมาะสำหรับงานโฆษณาทุกประเภท ไม่ว่าจะเป็นป้ายหน้าร้าน ป้ายโปรโมชั่น ป้ายกิจกรรม หรือออกบูธงานแสดงสินค้าผลิตจากวัสดุไวนิลหนา ทนแดด ทนฝน สีสันสดใส พิมพ์ด้วยระบบดิจิตอลความละเอียดสูง รองรับการใช้งานทั้งในร่มและกลางแจ้งสามารถสั่งทำได้ทุกขนาด พร้อมบริการเจาะตาไก่และขอบพับฟรี",
                    image: "https://scontent.furt1-1.fna.fbcdn.net/v/t39.30808-6/493224171_1257509799710870_3998754824460229343_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFfA7Lcgcn8xoEsmy-HS9V61Fd8y0Q1EcrUV3zLRDURyprUcX9aA-F2pVCkkgKhmbhLlKqKgHkO2ifUmsPHsAoP&_nc_ohc=-qWIC_mB98MQ7kNvwEUNBXT&_nc_oc=Adnrc3Y4ebfHp78L0i2xZkeSSY_nJRSRily90dz1JaOCW0NnC956lNbE3UjZeCufsvI&_nc_zt=23&_nc_ht=scontent.furt1-1.fna&_nc_gid=5Frs2RxBbYskIOuUYHMCLQ&oh=00_AfOP6CkFc3Gn-gUllzErAptcDyXM5-soVJeM-avXhIvIcA&oe=6847333F"
                },
                {
                    id: 2,
                    name: "ป้ายคอมโพสิต",
                    description: "ป้ายคอมโพสิต เป็นป้ายที่ผลิตจากแผ่นอลูมิเนียมคอมโพสิต แข็งแรง ทนทาน ให้ภาพลักษณ์หรูหรา เหมาะสำหรับติดตั้งเป็นป้ายชื่อบริษัท, ป้ายอาคาร, ป้ายหน้าร้าน, ป้ายสำนักงาน หรือป้ายตกแต่งภายในและภายนอกอาคาร วัสดุคอมโพสิตมีคุณสมบัติป้องกันสนิม ทนแดด ทนฝน อายุการใช้งานยาวนาน พื้นผิวเรียบ สวยงาม สามารถตกแต่งด้วยอักษรนูน, อะคริลิค, โลหะ, พิมพ์ UV หรือไดคัทตามแบบที่ต้องการ",
                    image: "https://scontent.furt1-1.fna.fbcdn.net/v/t39.30808-6/500407055_1285581083570408_7088848512085273310_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFuQCMteDbzLQhGWKvF1xTG6vBlPnYkNu_q8GU-diQ27xsdWq5t3BGM8wzBGuqoifxKzHWJKReLMWiqmWfBc80h&_nc_ohc=drWCuNKhgrcQ7kNvwHsON-3&_nc_oc=AdnW6s7w2hcWFTqGtbq3ruHuljpSU2fu5wZ-y-rbKVbjhYHr2ye30OnQvb5NQJZBLS0&_nc_zt=23&_nc_ht=scontent.furt1-1.fna&_nc_gid=qORTucQ0yORQP6DQjqVmmA&oh=00_AfNe-RyMG7sqTuw66V7CNZEJAF0VRxTmv0UzmcqGFecb-Q&oe=684710AD"
                },
                {
                    id: 3,
                    name: "สติ๊กเกอร์",
                    description: "สติ๊กเกอร์คุณภาพสูง พิมพ์สีสวยสด คมชัด กันน้ำ ทนแดด เหมาะสำหรับติดบนสินค้าหรือบรรจุภัณฑ์ เช่น ขวด เครื่องสำอาง กล่องของชำร่วย หรือใช้งานตกแต่งทั่วไป ผลิตจากวัสดุเกรดพรีเมียม ไม่หลุดลอกง่าย พร้อมบริการออกแบบฟรีตามความต้องการ",
                    image: "https://scontent.furt1-1.fna.fbcdn.net/v/t39.30808-6/495183750_1265239632271220_5837568735259825232_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFLRZxE5_KBVWw4xMxexzbp7sKzmq6B4n3uwrOaroHifTOmZucaUmLA7-Llayaj_jKB8gRMGN_-01sys6LTTvnm&_nc_ohc=gannsjoRw5sQ7kNvwE4Y3Hy&_nc_oc=AdlwoJ4CV5JkQ0SCsvFP5xbXy6coqrxx7sl4X68H8wsJ863UZSrxAWP28np0stXv3q0&_nc_zt=23&_nc_ht=scontent.furt1-1.fna&_nc_gid=ghQoyEshH3ZXO4EPQM24DQ&oh=00_AfOo47sNROMXEAVxhtCkkzyArCtYkZEZqB--4ESxOOoXNQ&oe=6847261C"
                },
                {
                    id: 4,
                    name: "ป้ายอะคริลิค",
                    description: "ป้ายอะคริลิคดีไซน์ทันสมัย ผลิตจากอะคริลิคคุณภาพสูง ผิวเรียบเงา แข็งแรง ทนทาน เหมาะสำหรับใช้เป็นป้ายชื่อ ป้ายหน้าห้อง ป้ายติดบริษัท หรือป้ายตกแต่งในออฟฟิศและร้านค้า สามารถสั่งทำได้หลากหลายขนาด พร้อมบริการพิมพ์ UV สีสันสดใส หรือแกะสลักตามแบบที่ลูกค้าต้องการ",
                    image: "https://scontent.furt1-1.fna.fbcdn.net/v/t39.30808-6/498914225_1278374014291115_3483586622666389213_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeG9Jyw6DMDTs3doGECvC5Bxv5Gok7F1OkC_kaiTsXU6QNJ-gBJQ-qtSGoivFQZuDwylPqVek4iahgVpeptCdwjm&_nc_ohc=L-Id_WacuoYQ7kNvwEDX3Kv&_nc_oc=AdlgWSDI036tYygk6fkDFFNa_LjOTEPLGK5jscZAT_6TCUXMwYVv2HHSsueK9ZmytIE&_nc_zt=23&_nc_ht=scontent.furt1-1.fna&_nc_gid=2540YXo9iCIWjE59Yrb4dQ&oh=00_AfMRvQIalxX6LyHyfDoeP_Nbyh-JDQtzhr0gj3Zd6P5_lA&oe=684713B8"
                },
                {
                    id: 5,
                    name: "ป้ายกล่องไฟ",
                    description: "ป้ายกล่องไฟคุณภาพสูง ช่วยเพิ่มความโดดเด่นให้กับร้านค้าหรือธุรกิจของคุณได้ทั้งกลางวันและกลางคืน ผลิตจากวัสดุเกรดพรีเมียม หน้าอะคริลิคใส แข็งแรง ทนทาน พร้อมระบบไฟ LED ภายในให้แสงสว่างทั่วถึง ประหยัดพลังงาน อายุการใช้งานยาวนาน เหมาะสำหรับใช้งานเป็นป้ายหน้าร้าน ป้ายบริษัท หรือป้ายโปรโมชั่นต่างๆ",
                    image: "https://scontent.furt1-1.fna.fbcdn.net/v/t39.30808-6/492098421_1256816253113558_4287901652510047720_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGQIWvG4S8QrekCfIqqcER7ovTH0UhpAUui9MfRSGkBS4XFCQP3-V7_FBvdAilpSD_XZk6XxAw8Zpc6hBxVWWY0&_nc_ohc=QlOi4JTqfo8Q7kNvwFJsjSy&_nc_oc=AdmWZQuKavzOj3OI1Slw_-IDjytDqt6nlLIc_r0I0f1jLLVGlPYzoZSXCklUV1Bk77g&_nc_zt=23&_nc_ht=scontent.furt1-1.fna&_nc_gid=NDySZuaUl8sukd7maRBjsg&oh=00_AfMvhJueLROhBn-VGdNlFvzThGF6NAI4XdtqVEK8-qUnrQ&oe=6847110A"
                }
            ]
            this.data = simpleData
        }

        getAllData() {
            return {
                success: true,
                data: this.data,
                count: this.data.length
            }
        }

        sanitizeInput(input) {
            if (typeof input !== 'string') return '';
            return input
                .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                .replace(/<[^>]+>/g, '')
                .replace(/javascript:/gi, '')
                .replace(/on\w+\s*=/gi, '')
                .trim();
        }

        checkRateLimit() {
            const now = Date.now()
            if (!this.lastSearch) this.lastSearch = 0
            if (!this.searchCount) this.searchCount = 0

            if (now - this.lastSearch > 60000) {
                this.searchCount = 0
            }

            if (this.searchCount >= 50) {
                throw new Error('คำขอมากเกินไป กรุณารอสักครู่')
            }

            this.searchCount++
            this.lastSearch = nowq
        }

        search(query) {
            try {
                this.checkRateLimit()
                const cleanQuery = this.sanitizeInput(query)
                if (!cleanQuery || cleanQuery.length < 1) {
                    throw new Error('กรุณาใส่คำค้นหา')
                }

                if (cleanQuery.length > 100) {
                    throw new Error('คำค้นหายาวเกินไป')
                }

                const result = this.data.filter(record => {
                    return Object.values(record).some(value =>
                        value.toString().toLowerCase().includes(cleanQuery.toLowerCase())
                    )
                })

                return {
                    success: true,
                    data: result,
                    query: cleanQuery,
                    count: result.length
                }
            } catch (error) {
                return {
                    success: false,
                    error: error.message,
                    data: [],
                    count: 0
                }
            }
        }
    }

    const db = new SimpleDatabase()

    function displayResults(result, ouput) {
        const resultsDiv = ouput

        if (!result.success) {
            resultsDiv.innerHTML = `<p class="error">เกิดข้อผิดพลาด: ${result.error}</p>`;
            return;
        }

        if (result.count === 0) {
            resultsDiv.innerHTML = '<p>ไม่พบข้อมูลที่ค้นหา</p>';
            return;
        }

        let html = `<p class="success">พบข้อมูล ${result.count} รายการ</p>`;

        result.data.forEach(record => {
            html += `
                <div class="record">
                    <strong>ID:</strong> ${record.id}<br>
                    <strong>ชื่อ:</strong> ${record.name}<br>
                    <strong>รายละเอียด:</strong> ${record.description}<br>
                    <img src="${record.image}" alt="${record.name}" style="max-width: 300px;"><br>
                </div>
            `;
        });

        resultsDiv.innerHTML = html;
    }

    function showAllData() {
        const result = db.getAllData();
        displayResults(result);
    }

    function searchData(query) {
        const query = query.value
        const result = db.search(query);
        displayResults(result);
    }
});
