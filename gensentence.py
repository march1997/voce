 #-*-coding: utf-8 -*-

find = ['ค้นหา', 'หา', 'เสิร์ช', 'ช่วยหา']
video = [' วิดีโอ', '']
modifier = ['รีวิว', 'วิธีทำ', 'ท่องเที่ยว', 'ตัวอย่าง', 'เพลง', 'สอน']
things = ['ร้านอาหาร', 'คาเฟ่', 'มือถือ', 'หนังสือ', 'ภาพยนต์']
food = ['ไข่เจียว', 'ไข่คน', 'ข้าวผัด', 'พาสต้า', 'เฟรนช์โทส']
places = ['ฮ่องกง', 'นิวยอร์ค', 'ปารีส', 'โรม', 'ลอนดอน', 'กรุงเทพ', 'เชียงใหม่', 'ภูเก็ต', 'ไทย', 'อิตาลี', 'ฝรั่งเศส', 'ญี่ปุ่น', 'เกาหลี', 'อเมริกา', 'ยุโรป', 'ออสเตรเลีย']
movies = ['อเวนเจอร์', 'สเตรนเจอร์ธิงส์', 'อินเซปชั่น', 'แฮรี่พ็อตเตอร์', 'บุพเพสันนิวาส', 'เกมอำนาจ', 'เกมออฟโธรนส์']
music = ['รัก', 'เศร้า', 'คนโสด', 'ฮิต', 'ใหม่']

teach = ['ภาษา', 'วิธี', '']
languages = ['ซี', 'ไพธอน', 'จาวา', 'รูบี้', 'อังกฤษ', 'ฝรั่งเศส', 'อิตาเลียน', 'สเปน', 'จีน', 'ญี่ปุ่น']
foodaction = ['ทำ', 'ปรุง', 'กิน']
activities = ['ฟุตบอล', 'เทนนิส', 'เต้น', 'ขับรถ', 'ขี่จักรยาน', 'เซิร์ฟบอร์ด']

controls = ['หยุด วิดิโอ', 'เล่น วิดิโอ', 'ข้ามไป นาทีที่', 'เพิ่ม เสียง', 'ลด เสียง', 'เปิด เสียง', 'ปิด เสียง', 'เงียบ', 'เร่ง ความเร็ว', 'ชะลอ ความเร็ว']
numbers = ['หนึ่ง', 'สอง', 'สาม', 'สี่', 'ห้า', 'หก', 'เจ็ด', 'แปด', 'เก้า', 'สิบ']

sentence0 = ''

for word1 in find:
    sentence1 = sentence0 + word1
    for word2 in video:
        sentence2 = sentence1 + word2 + ' '
        for word3 in modifier:
            sentence3 = sentence2 + word3 + ' '
            if word3 == 'รีวิว':
                for word4 in things:
                    sentence4 = sentence3 + word4
                    print(sentence4)
            elif word3 == 'วิธีทำ':
                for word4 in food:
                    sentence4 = sentence3 + word4
                    print(sentence4)
            elif word3 == 'ท่องเที่ยว':
                for word4 in places:
                    sentence4 = sentence3 + word4
                    print(sentence4)
            elif word3 == 'ตัวอย่าง':
                for word4 in movies:
                    sentence4 = sentence3 + word4
                    print(sentence4)
            elif word3 == 'เพลง':
                for word4 in music:
                    sentence4 = sentence3 + word4
                    print(sentence4)
            elif word3 == 'สอน':
                for word4 in teach:
                    sentence4 = sentence3 + word4 + ' '
                    if word4 == 'ภาษา':
                        for word5 in languages:
                            sentence5 = sentence4 + word5
                            print(sentence5)
                    elif word4 == 'วิธี':
                        for word5 in foodaction:
                            sentence5 = sentence4 + word5 + ' '
                            for word6 in food:
                                sentence6 = sentence5 + word6
                                print(sentence6)
                    elif word4 == '':
                        for word5 in activities:
                            sentence5 = sentence4 + word5
                            print(sentence5)

for i in range(4):
    for word1 in controls:
        sentence1 = sentence0 + word1
        if word1 == 'ข้ามไป นาทีที่':
            for word2 in numbers:
                sentence2 = sentence1 + ' ' + word2
                print(sentence2)
        else:
            print(sentence1)
