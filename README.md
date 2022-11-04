# PBl6

### Cách cài đặt project
- Bấm vào nút fork để tạo bản sao project về Github của bản thân
- Bấm vào nút code sẽ thấy link của project
- gõ git clone <link> để clone project về máy
- cd PBL6
~/PBL6$ npm install
~/PBL6$ cd client
~/PBL6/client$ npm install
~/PBL6/client$ cd ..

### Khởi động project
- copy file .env.temp thành .env
- Thay <username> <password> bằng tài khoản mật khẩu của mình
Tài khoản mật khẩu của team
TK: PBL6 MK: PBL6

~/PBL6$ npm start 
để chạy project ( cả client và front end)

### Quy trình code

- Chạy lệnh "git remote add main https://github.com/duong1906ltv/PBL6.git" để add thêm remote chính để push code
- Trước khi code :
    + Checkout ra sprint tương ứng để code bằng lệnh " git checkout main/sprint_x (x là sprint tương ứng)
    + "git fetch main" để lấy code mới nhất về
    + "git checkout -b <ten_branch>" để tạo branch mới và bắt đầu code
- Sau khi code xong:
    + Tên commit là tên task được nhận
    + gõ "git push origin" sẽ thấy một lệnh mới hiện ra
    + Copy lệnh vừa hiện ra và chạy lại
    + Nhập tên tk và mk của github (mk của github là personal access token, nếu không biết tạo thì hỏi Dương để biết thêm thông tin chi tiết)
    + sau đó lên browser của github sẽ thấy nút compare and pull request
    + Chọn base từ main thành sprint tương ứng
    + create pull request
    + gọi team để review code


### Cách reset khi code sai

- gõ "git log --oneline"
- Hãy lùi về commit gần nhất trước commit bạn code
Ví dụ:  aaaaaa your commit
        bbbbbb nearest your commit
- Gõ " git reset --soft bbbbbb"
- Tới đây bắt đầu sửa code
- Sửa code xong thì gõ " git push -f" để đưa code mới nhất lên remote
