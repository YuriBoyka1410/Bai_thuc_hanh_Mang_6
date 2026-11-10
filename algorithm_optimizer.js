// ===================================
// 1. DỮ LIỆU ĐẦU VÀO MEGASTORE
// ===================================

const mega_store = [
  {
    category: "Điện thoại",
    products: [
      { id: 1, name: "Iphone 15", price: 20000000 },
      { id: 2, name: "Samsung S24", price: 18000000 },
    ],
  },
  {
    category: "Máy tính",
    products: [
      { id: 3, name: "Macbook Air", price: 25000000 },
      { id: 4, name: "Dell XPS", price: 30000000 },
    ],
  },
  {
    category: "Phụ kiện",
    products: [
      { id: 5, name: "Chuột Logitech", price: 500000 },
      { id: 6, name: "Bàn phím cơ", price: 1200000 },
    ],
  },
];
console.log(mega_store);

// Hàm Flatten làm phẳng dữ liệu
function flatten_products(data) {
  //Bước 1: Tạo mảng rỗng để chứa sản phẩm
  let result = [];
  //Bước 2: Duyệt từng danh mục
  for (let i = 0; i < data.length; i++) {
    //Lấy list sản phẩm của danh mục hiện tại
    let products = data[i].products;
    //Bước 3: Duyệt từng sản phẩm
    for (let j = 0; j < products.length; j++) {
      //Bước 4: Đưa sản phẩm vào mảng kết quả
      result.push(products[j]);
    }
  }
  return result;
}
const all_products = flatten_products(mega_store);
console.log(all_products);

//Hàm sắp xếp nhanh
function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function partition(arr, left, right) {
  let pivot = arr[right].price;
  let i = left - 1;
  for (let j = left; j < right; j++) {
    if (arr[j].price <= pivot) {
      i++;
      swap(arr, i, j);
    }
  }
  swap(arr, i + 1, right);
  return i + 1;
}

function quick_sort(arr, left, right) {
  if (left < right) {
    let pivot_index = partition(arr, left, right);
    quick_sort(arr, left, pivot_index - 1);
    quick_sort(arr, pivot_index + 1, right);
  }
}

quick_sort(all_products, 0, all_products.length - 1);
console.log("Sản phẩm sau khi sắp xếp: ");
console.log(all_products);

//Tìm kiếm nhị phân
function binary_search(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid].price === target) {
      return mid;
    }
    if (arr[mid].price < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}
let result = binary_search(all_products, 18000000);
if (result !== -1) {
  console.log("Đã tìm thấy sản phẩm:");
  console.log(all_products[result]);
} else {
  console.log("Không tìm thấy sản phẩm!");
}

//So sánh
function bubbleSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j].price > arr[j + 1].price) {
        swap(arr, j, j + 1);
      }
    }
  }
}
function legacySearchAndSort(data, keyword) {
  let result = [];

  // Duyệt từng danh mục
  for (let i = 0; i < data.length; i++) {
    let products = data[i].products;

    // Duyệt từng sản phẩm
    for (let j = 0; j < products.length; j++) {
      if (products[j].name.includes(keyword)) {
        result.push(products[j]);
      }
    }
  }

  // Sắp xếp kết quả bằng Bubble Sort
  bubbleSort(result);

  return result;
}
function optimizedSearchAndSort(data, keyword) {
  let allProducts = flatten_products(data);
  let result = [];

  for (let i = 0; i < allProducts.length; i++) {
    if (allProducts[i].name.includes(keyword)) {
      result.push(allProducts[i]);
    }
  }

  quickSort(result, 0, result.length - 1);

  return result;
}
function generateMegaStore(totalProducts) {
  let data = [];
  let categorySize = 1000;
  let totalCategories = Math.ceil(totalProducts / categorySize);
  let id = 1;

  for (let i = 0; i < totalCategories; i++) {
    let category = {
      category: "Danh mục " + (i + 1),
      products: [],
    };

    for (let j = 0; j < categorySize; j++) {
      if (id > totalProducts) {
        break;
      }

      let productName;

      if (id % 1000 === 0) {
        productName = "Target Product " + id;
      } else {
        productName = "Product " + id;
      }

      let product = {
        id: id,
        name: productName,
        price: id * 10 + 500,
      };

      category.products.push(product);
      id++;
    }

    data.push(category);
  }

  return data;
}
let testSizes = [1000, 10000, 500000];

for (let i = 0; i < testSizes.length; i++) {
  let size = testSizes[i];

  console.log("------------------------------------");
  console.log("KIỂM TRA VỚI", size, "SẢN PHẨM");
  console.log("------------------------------------");

  let testData = generateMegaStore(size);

  console.time("Legacy - " + size);

  let legacyResult = legacySearchAndSort(testData, "Target");

  console.timeEnd("Legacy - " + size);

  console.time("Optimized - " + size);

  let optimizedResult = optimizedSearchAndSort(testData, "Target");

  console.timeEnd("Optimized - " + size);

  console.log("Legacy tìm được:", legacyResult.length);
  console.log("Optimized tìm được:", optimizedResult.length);

  console.log(
    "Sản phẩm đầu tiên Legacy:",
    legacyResult.length > 0 ? legacyResult[0] : "Không có",
  );

  console.log(
    "Sản phẩm đầu tiên Optimized:",
    optimizedResult.length > 0 ? optimizedResult[0] : "Không có",
  );
}

// ==========================================
// 11. LINEAR SEARCH
// ==========================================

function linearSearchByPrice(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].price === target) {
      return i;
    }
  }

  return -1;
}

// ==========================================
// 12. SO SÁNH LINEAR SEARCH VÀ BINARY SEARCH
// ==========================================

function benchmarkSearch(totalProducts) {
  console.log("====================================");
  console.log("SO SÁNH TÌM KIẾM:", totalProducts, "SẢN PHẨM");
  console.log("====================================");

  let testData = generateMegaStore(totalProducts);

  let allProducts = flatten_products(testData);

  // Phải sắp xếp trước khi sử dụng Binary Search
  quickSort(allProducts, 0, allProducts.length - 1);

  // Chọn sản phẩm có giá cao nhất để Linear Search phải duyệt gần hết mảng
  let target = allProducts[allProducts.length - 1].price;

  let repetitions = 1000;
  let result;

  console.time("Linear Search - " + totalProducts);

  for (let i = 0; i < repetitions; i++) {
    result = linearSearchByPrice(allProducts, target);
  }

  console.timeEnd("Linear Search - " + totalProducts);

  console.time("Binary Search - " + totalProducts);

  for (let i = 0; i < repetitions; i++) {
    result = binarySearch(allProducts, target);
  }

  console.timeEnd("Binary Search - " + totalProducts);

  console.log("Giá cần tìm:", target);
  console.log("Vị trí tìm thấy:", result);
}

// Chạy kiểm tra với 3 kích thước dữ liệu
benchmarkSearch(1000);
benchmarkSearch(10000);
benchmarkSearch(500000);
