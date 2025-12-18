
import { PythonFunction, KnowledgeTopic, Exercise, Difficulty, PythonLibrary } from './types';

export const pythonFunctions: PythonFunction[] = [
  {
    name: "print",
    description: "In đối tượng ra màn hình console.",
    syntax: "print(*objects, sep=' ', end='\\n', file=sys.stdout, flush=False)",
    example: "print('Xin chào', 'Python', sep='-')\n# Output: Xin chào-Python",
    commonErrors: ["Quên dấu ngoặc đơn trong Python 3.x", "Nhầm lẫn giữa sep và end."],
    tips: "Sử dụng f-string (print(f'Biến x: {x}')) để format chuỗi dễ dàng hơn."
  },
  {
    name: "len",
    description: "Trả về độ dài (số lượng phần tử) của một đối tượng.",
    syntax: "len(s)",
    example: "my_list = [1, 2, 3]\nprint(len(my_list)) # 3",
    commonErrors: ["Sử dụng len() cho số nguyên (int) hoặc số thực (float)."],
    tips: "Có thể dùng để kiểm tra chuỗi rỗng nhanh chóng: if not len(s):"
  },
  {
    name: "input",
    description: "Nhận dữ liệu đầu vào từ người dùng dưới dạng chuỗi.",
    syntax: "input([prompt])",
    example: "name = input('Nhập tên: ')\nprint(f'Chào {name}')",
    commonErrors: ["Quên rằng input luôn trả về chuỗi (str). Cần ép kiểu int() nếu nhập số."],
    tips: "Luôn kèm theo prompt để người dùng biết cần nhập gì."
  },
  {
    name: "range",
    description: "Tạo ra một dãy số, thường dùng trong vòng lặp for.",
    syntax: "range(start, stop[, step])",
    example: "for i in range(1, 10, 2):\n    print(i) # 1, 3, 5, 7, 9",
    commonErrors: ["Nhầm rằng stop được bao gồm (thực tế dừng TRƯỚC stop)."],
    tips: "Dùng step âm để đếm ngược: range(10, 0, -1)."
  },
  {
    name: "type",
    description: "Trả về kiểu dữ liệu của đối tượng.",
    syntax: "type(object)",
    example: "x = 10\nprint(type(x)) # <class 'int'>",
    commonErrors: ["So sánh type trực tiếp thay vì dùng isinstance()."],
    tips: "Nên dùng isinstance(obj, type) để hỗ trợ kế thừa."
  },
  {
    name: "enumerate",
    description: "Trả về chỉ số và giá trị khi lặp.",
    syntax: "enumerate(iterable, start=0)",
    example: "fruits = ['táo', 'chuối']\nfor i, f in enumerate(fruits):\n    print(i, f)",
    commonErrors: ["Quên tham số start nếu muốn đếm từ 1."],
    tips: "Sạch sẽ hơn việc dùng range(len(list))."
  },
  {
    name: "zip",
    description: "Gộp nhiều iterable lại với nhau.",
    syntax: "zip(*iterables)",
    example: "names = ['An', 'Bình']\nscores = [10, 9]\nlist(zip(names, scores)) # [('An', 10), ('Bình', 9)]",
    commonErrors: ["Dừng ở iterable ngắn nhất nếu độ dài không bằng nhau."],
    tips: "Rất hữu ích khi cần duyệt song song hai danh sách."
  },
  {
    name: "sorted",
    description: "Trả về một list mới đã được sắp xếp.",
    syntax: "sorted(iterable, key=None, reverse=False)",
    example: "a = [3, 1, 2]\nprint(sorted(a)) # [1, 2, 3]",
    commonErrors: ["Nghĩ rằng nó sửa list gốc (dùng list.sort() để sửa gốc)."],
    tips: "Dùng tham số key=len để sắp xếp theo độ bài."
  }
];

export const pythonLibraries: PythonLibrary[] = [
  {
    name: "turtle",
    description: "Thư viện đồ họa rùa kinh điển để học lập trình tư duy hình học.",
    category: "Đồ họa & Giáo dục",
    isStandard: true,
    keyFeatures: [
      "Vẽ hình bằng cách di chuyển một con rùa trên màn hình",
      "Học các khái niệm vòng lặp và hàm trực quan",
      "Tạo ra các hình học phức tạp, hoa văn đối xứng",
      "Đơn giản, không cần cài đặt thêm"
    ],
    example: "import turtle\n\nt = turtle.Turtle()\nfor i in range(4):\n    t.forward(100)\n    t.left(90)\nturtle.done()"
  },
  {
    name: "pygame",
    description: "Thư viện phát triển trò chơi 2D mạnh mẽ và phổ biến nhất Python.",
    category: "Đồ họa & Game",
    isStandard: false,
    installCommand: "pip install pygame",
    keyFeatures: [
      "Xử lý hình ảnh, âm thanh và sự kiện bàn phím/chuột",
      "Quản lý Sprite và va chạm (Collision detection)",
      "Hiệu năng cao cho đồ họa 2D",
      "Cộng đồng hỗ trợ cực lớn với hàng ngàn mẫu game"
    ],
    example: "import pygame\n\npygame.init()\nscreen = pygame.display.set_mode((400, 300))\nrunning = True\nwhile running:\n    for event in pygame.event.get():\n        if event.type == pygame.QUIT: running = False\npygame.quit()"
  },
  {
    name: "tkinter",
    description: "Thư viện chuẩn của Python để xây dựng giao diện người dùng (GUI) trên desktop.",
    category: "Giao diện (GUI)",
    isStandard: true,
    keyFeatures: [
      "Xây dựng cửa sổ, nút bấm, ô nhập liệu",
      "Tạo các ứng dụng phần mềm máy tính hoàn chỉnh",
      "Hỗ trợ quản lý layout linh hoạt",
      "Nhẹ, nhanh và tích hợp sẵn trong Python"
    ],
    example: "import tkinter as tk\n\nroot = tk.Tk()\nroot.title('Ứng dụng của tôi')\nlabel = tk.Label(root, text='Chào bạn!')\nlabel.pack()\nroot.mainloop()"
  },
  {
    name: "math",
    description: "Cung cấp các hàm toán học cơ bản và hằng số số học.",
    category: "Thư viện chuẩn",
    isStandard: true,
    keyFeatures: [
      "Tính căn bậc hai (sqrt)",
      "Các hàm lượng giác (sin, cos, tan)",
      "Logarit và số mũ",
      "Các hằng số như pi, e"
    ],
    example: "import math\n\nprint(math.sqrt(16)) # 4.0\nprint(math.pi) # 3.141592653589793"
  },
  {
    name: "random",
    description: "Dùng để tạo các số ngẫu nhiên, chọn phần tử ngẫu nhiên từ danh sách.",
    category: "Thư viện chuẩn",
    isStandard: true,
    keyFeatures: [
      "Tạo số nguyên ngẫu nhiên (randint)",
      "Chọn ngẫu nhiên từ list (choice)",
      "Xáo trộn danh sách (shuffle)",
      "Tạo số thực từ 0 đến 1 (random)"
    ],
    example: "import random\n\nprint(random.randint(1, 10)) # Số ngẫu nhiên từ 1-10\ncolors = ['đỏ', 'xanh', 'vàng']\nprint(random.choice(colors)) # Chọn 1 màu bất kỳ"
  },
  {
    name: "datetime",
    description: "Xử lý ngày tháng và thời gian.",
    category: "Thư viện chuẩn",
    isStandard: true,
    keyFeatures: [
      "Lấy thời gian hiện tại",
      "Định dạng ngày tháng (strftime)",
      "Tính toán khoảng cách thời gian (timedelta)",
      "Chuyển đổi chuỗi thành ngày tháng"
    ],
    example: "from datetime import datetime\n\nnow = datetime.now()\nprint(now.strftime('%d/%m/%Y %H:%M:%S'))"
  },
  {
    name: "requests",
    description: "Thư viện phổ biến nhất để gửi các yêu cầu HTTP (gọi API).",
    category: "Bên thứ ba",
    isStandard: false,
    installCommand: "pip install requests",
    keyFeatures: [
      "Gửi GET, POST requests dễ dàng",
      "Xử lý JSON trả về tự động",
      "Quản lý Header và Cookie",
      "Xử lý Timeout và Session"
    ],
    example: "import requests\n\nresponse = requests.get('https://api.github.com')\nprint(response.status_code) # 200\nprint(response.json()) # Dữ liệu dạng dict"
  },
  {
    name: "numpy",
    description: "Thư viện nền tảng cho tính toán khoa học với mảng đa chiều.",
    category: "Khoa học dữ liệu",
    isStandard: false,
    installCommand: "pip install numpy",
    keyFeatures: [
      "Mảng đa chiều (ndarray) cực nhanh",
      "Các phép toán đại số tuyến tính",
      "Xử lý mảng thay thế cho vòng lặp",
      "Tương thích tốt với các thư viện AI"
    ],
    example: "import numpy as np\n\narr = np.array([1, 2, 3])\nprint(arr * 2) # [2, 4, 6] - Nhân toàn bộ mảng"
  },
  {
    name: "pandas",
    description: "Công cụ phân tích và xử lý dữ liệu mạnh mẽ dưới dạng bảng (DataFrame).",
    category: "Khoa học dữ liệu",
    isStandard: false,
    installCommand: "pip install pandas",
    keyFeatures: [
      "Đọc/Ghi file CSV, Excel, SQL",
      "Xử lý dữ liệu thiếu (missing data)",
      "Lọc, sắp xếp và nhóm dữ liệu",
      "Thống kê mô tả nhanh chóng"
    ],
    example: "import pandas as pd\n\ndf = pd.DataFrame({'Ten': ['A', 'B'], 'Diem': [8, 9]})\nprint(df.describe()) # Thống kê nhanh"
  },
  {
    name: "matplotlib",
    description: "Thư viện vẽ đồ thị và trực quan hóa dữ liệu 2D.",
    category: "Trực quan hóa",
    isStandard: false,
    installCommand: "pip install matplotlib",
    keyFeatures: [
      "Vẽ đồ thị đường, cột, tròn, tán xạ",
      "Tùy chỉnh nhãn, màu sắc và chú thích",
      "Xuất hình ảnh chất lượng cao (PNG, PDF)",
      "Tích hợp hoàn hảo với NumPy và Pandas"
    ],
    example: "import matplotlib.pyplot as plt\n\nx = [1, 2, 3, 4]\ny = [10, 20, 25, 30]\nplt.plot(x, y)\nplt.show()"
  }
];

export const knowledgeBase: KnowledgeTopic[] = [
  {
    id: "k1",
    category: "Cơ bản",
    title: "Biến & Kiểu dữ liệu",
    content: `Trong Python, bạn không cần khai báo kiểu dữ liệu. Python tự hiểu kiểu dựa trên giá trị bạn gán.

**Các kiểu cơ bản:**
- **int**: Số nguyên (ví dụ: 10, -5)
- **float**: Số thực (ví dụ: 3.14, 2.0)
- **str**: Chuỗi ký tự (ví dụ: "Chào", 'Python')
- **bool**: Giá trị logic (True hoặc False)

**Ví dụ:**
\`\`\`python
tuoi = 25          # int
diem_so = 8.5      # float
ten = "Hoàng"      # str
is_passed = True   # bool
\`\`\`
`
  },
  {
    id: "k2",
    category: "Cơ bản",
    title: "Toán tử",
    content: `Toán tử giúp thực hiện các tính toán và so sánh dữ liệu.

**Toán tử số học:**
- \`+\`, \`-\`, \`*\`, \`/\`: Cộng, trừ, nhân, chia.
- \`//\`: Chia lấy phần nguyên (ví dụ: 10 // 3 = 3).
- \`%\`: Chia lấy phần dư (ví dụ: 10 % 3 = 1).
- \`**\`: Toán tử lũy thừa (ví dụ: 2 ** 3 = 8). Đây là cách Python thực hiện phép tính mũ, tránh nhầm lẫn với ký hiệu \`^\` (phép XOR).

**Toán tử so sánh:**
- \`==\`, \`!=\`: Bằng, khác.
- \`>\`, \`<\`, \`>=\`, \`<=\`: So sánh lớn hơn, nhỏ hơn...

**Toán tử Logic:**
- \`and\`, \`or\`, \`not\`.

**Ví dụ thực tế:**
\`\`\`python
a = 2
b = 3
print(a ** b)  # Kết quả: 8 (2 lũy thừa 3)
print(10 % 4)  # Kết quả: 2 (dư của phép chia 10 cho 4)
\`\`\`
`
  },
  {
    id: "k3",
    category: "Cơ bản",
    title: "Chuỗi (Strings)",
    content: `Chuỗi là tập hợp các ký tự đặt trong dấu nháy đơn hoặc kép.

**Thao tác cơ bản:**
- **Nối chuỗi**: Dùng dấu \`+\`.
- **Cắt chuỗi (Slicing)**: \`s[start:end]\`.
- **Độ dài**: \`len(s)\`.

**Phương thức phổ biến:**
- \`s.upper()\`, \`s.lower()\`: Chuyển hoa/thường.
- \`s.strip()\`: Bỏ khoảng trắng thừa ở hai đầu.
- \`s.replace(old, new)\`: Thay thế nội dung.
- \`s.split(sep)\`: Tách chuỗi thành danh sách.

**Ví dụ:**
\`\`\`python
msg = "  Hello Python  "
print(msg.strip().upper()) # "HELLO PYTHON"
print(msg[2:7]) # "Hello"
\`\`\`
`
  },
  {
    id: "k4",
    category: "Điều khiển luồng",
    title: "Câu lệnh IF (Rẽ nhánh)",
    content: `Dùng để thực hiện các khối mã dựa trên điều kiện.

\`\`\`python
diem = 8
if diem >= 9:
    print("Xuất sắc")
elif diem >= 7:
    print("Khá")
else:
    print("Trung bình")
\`\`\`

**Lưu ý quan trọng**: Python dùng **Indentation** (thụt lề - thường là 4 khoảng trắng) để phân biệt các khối mã. Đừng quên dấu hai chấm \`:\` sau mỗi câu lệnh điều kiện.
`
  },
  {
    id: "k5",
    category: "Điều khiển luồng",
    title: "Vòng lặp For & While",
    content: `Vòng lặp giúp chạy một đoạn code nhiều lần.

**1. Vòng lặp For:** Thường dùng để duyệt qua một danh sách hoặc dãy số.
\`\`\`python
for i in range(5):
    print(f"Lần lặp thứ {i}")

trai_cay = ["Táo", "Cam", "Xoài"]
for f in trai_cay:
    print(f)
\`\`\`

**2. Vòng lặp While:** Chạy khi điều kiện còn đúng.
\`\`\`python
count = 0
while count < 3:
    print(count)
    count += 1
\`\`\`
`
  },
  {
    id: "k6",
    category: "Cấu trúc dữ liệu",
    title: "Danh sách (List)",
    content: `List là cấu trúc dữ liệu phổ biến nhất, chứa được nhiều kiểu dữ liệu và có thể thay đổi.

**Đặc điểm:**
- Khai báo bằng dấu ngoặc vuông \`[]\`.
- Các phần tử đánh số từ 0.

**Các thao tác:**
- \`append(x)\`: Thêm vào cuối.
- \`insert(i, x)\`: Thêm vào vị trí i.
- \`pop()\`: Xóa phần tử cuối.
- \`remove(x)\`: Xóa phần tử có giá trị x.

\`\`\`python
nums = [1, 2, 3]
nums.append(4)
print(nums[0]) # 1
nums[1] = 10 # Thay đổi giá trị
\`\`\`
`
  },
  {
    id: "k7",
    category: "Cấu trúc dữ liệu",
    title: "Dictionary (Từ điển)",
    content: `Dictionary lưu trữ dữ liệu dạng cặp **Key-Value** (Khóa-Giá trị).

**Đặc điểm:**
- Khai báo bằng dấu ngoặc nhọn \`{}\`.
- Key phải là duy nhất.

\`\`\`python
user = {
    "name": "Nam",
    "age": 20,
    "email": "nam@example.com"
}
print(user["name"]) # Nam
user["age"] = 21 # Cập nhật
user["city"] = "Hanoi" # Thêm mới
\`\`\`
`
  },
  {
    id: "k8",
    category: "Cấu trúc mã",
    title: "Hàm (Function)",
    content: `Hàm giúp gom nhóm các đoạn code thực hiện một nhiệm vụ cụ thể để tái sử dụng.

\`\`\`python
def tinh_tong(a, b):
    return a + b

ket_qua = tinh_tong(5, 7)
print(ket_qua) # 12
\`\`\`

**Tham số mặc định:**
\`\`\`python
def chao(ten="Bạn"):
    print(f"Chào {ten}!")

chao() # Chào Bạn!
chao("An") # Chào An!
\`\`\`
`
  },
  {
    id: "k9",
    category: "Nâng cao",
    title: "Lập trình hướng đối tượng (OOP)",
    content: `OOP giúp tổ chức code xung quanh các "Đối tượng" (Objects) thay vì chỉ các hàm.

**1. Class (Lớp)**: Là khuôn mẫu.
**2. Object (Đối tượng)**: Là thực thể được tạo từ lớp.

\`\`\`python
class Dog:
    def __init__(self, name, breed):
        self.name = name
        self.breed = breed
    
    def bark(self):
        return f"{self.name} sủa: Gâu gâu!"

my_dog = Dog("Lu", "Poodle")
print(my_dog.bark())
\`\`\`
`
  }
];

export const exercises: Exercise[] = [
  {
    id: "ex1",
    title: "Chào mừng đến với Python",
    difficulty: Difficulty.Easy,
    description: "In ra dòng chữ 'Hello World' bằng Python.",
    initialCode: "# Viết code ở đây\n",
    hint: "Dùng hàm print()."
  },
  {
    id: "ex2",
    title: "Phép toán cơ bản",
    difficulty: Difficulty.Easy,
    description: "Tạo 2 biến x = 15, y = 4. Tính và in ra kết quả của phép chia lấy dư x cho y.",
    initialCode: "x = 15\ny = 4\n# In kết quả chia lấy dư\n",
    hint: "Dùng toán tử %."
  },
  {
    id: "ex3",
    title: "Ghép tên thành viên",
    difficulty: Difficulty.Easy,
    description: "Cho biến ho = 'Nguyễn', ten = 'An'. Hãy in ra tên đầy đủ 'Nguyễn An' bằng cách nối chuỗi.",
    initialCode: "ho = 'Nguyễn'\nten = 'An'\n# In ra tên đầy đủ\n",
    hint: "Dùng toán tử + và đừng quên một khoảng trắng ở giữa."
  },
  {
    id: "ex4",
    title: "Vòng lặp số chẵn",
    difficulty: Difficulty.Medium,
    description: "Sử dụng vòng lặp for và range() để in ra các số chẵn từ 2 đến 10 (bao gồm cả 10).",
    initialCode: "# Viết vòng lặp tại đây\n",
    hint: "range(start, stop, step) - hãy thử dùng step = 2."
  },
  {
    id: "ex5",
    title: "Kiểm tra số âm/dương",
    difficulty: Difficulty.Medium,
    description: "Viết hàm `check_sign(n)` in ra 'Dương' nếu n > 0, 'Âm' nếu n < 0, và 'Không' nếu n = 0. Thử gọi hàm với n = -5.",
    initialCode: "def check_sign(n):\n    # Code logic\n    pass\n\ncheck_sign(-5)",
    hint: "Dùng cấu trúc if - elif - else."
  },
  {
    id: "ex6",
    title: "Tổng các số trong list",
    difficulty: Difficulty.Medium,
    description: "Cho danh sách `a = [10, 20, 30, 40]`. Hãy tính tổng các phần tử trong danh sách này mà không dùng hàm sum() tích hợp sẵn.",
    initialCode: "a = [10, 20, 30, 40]\ntong = 0\n# Dùng vòng lặp for để tính\n",
    hint: "Lặp qua từng phần tử và cộng dồn vào biến tong."
  },
  {
    id: "ex7",
    title: "Đếm số ký tự 'a'",
    difficulty: Difficulty.Medium,
    description: "Viết chương trình đếm xem trong chuỗi s = 'banana' có bao nhiêu chữ 'a'.",
    initialCode: "s = 'banana'\n# Đếm và in kết quả\n",
    hint: "Có thể dùng vòng lặp for char in s hoặc phương thức s.count()."
  },
  {
    id: "ex8",
    title: "Tìm số lớn nhất",
    difficulty: Difficulty.Hard,
    description: "Viết hàm `find_max(list_nums)` để tìm và trả về số lớn nhất trong một danh sách các số. Test with [3, 9, 2, 7, 5].",
    initialCode: "def find_max(list_nums):\n    # Giả định số đầu tiên là lớn nhất, rồi so sánh với các số còn lại\n    pass\n\nprint(find_max([3, 9, 2, 7, 5]))",
    hint: "Khởi tạo max_val = list_nums[0]."
  },
  {
    id: "ex9",
    title: "Đảo ngược danh sách",
    difficulty: Difficulty.Hard,
    description: "Cho list `my_list = [1, 2, 3, 4, 5]`. Hãy tạo ra một list mới có thứ tự đảo ngược mà không dùng hàm reversed() hay phương thức reverse().",
    initialCode: "my_list = [1, 2, 3, 4, 5]\n# Tạo list mới đảo ngược\n",
    hint: "Dùng slicing [::-1] là cách ngắn nhất."
  }
];
