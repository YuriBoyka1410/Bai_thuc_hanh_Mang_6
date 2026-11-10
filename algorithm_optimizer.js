// ============================================================
// MEGASTORE - ALGORITHM OPTIMIZER VERSION 2
// 1. Flatten
// 2. Bubble Sort
// 3. Quick Sort (Median-of-three)
// 4. Linear Search
// 5. Binary Search
// 6. Benchmark Legacy vs Optimized
// ============================================================

// 1. DỮ LIỆU MẪU
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

// 2. FLATTEN - LÀM PHẲNG MẢNG
function flatten_products(data) {
  let result = [];

  for (let i = 0; i < data.length; i++) {
    let products = data[i].products;

    for (let j = 0; j < products.length; j++) {
      result.push(products[j]);
    }
  }

  return result;
}

// 3. HÀM SWAP - ĐỔI CHỖ HAI PHẦN TỬ
function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

// 4. BUBBLE SORT - THUẬT TOÁN CŨ
function bubbleSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let swapped = false;

    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j].price > arr[j + 1].price) {
        swap(arr, j, j + 1);
        swapped = true;
      }
    }

    if (swapped === false) {
      break;
    }
  }
}

// 5. QUICK SORT - MEDIAN OF THREE
function medianOfThree(arr, left, right) {
  let middle = Math.floor((left + right) / 2);

  let first = arr[left].price;
  let mid = arr[middle].price;
  let last = arr[right].price;

  if ((first <= mid && mid <= last) || (last <= mid && mid <= first)) {
    return mid;
  }

  if ((mid <= first && first <= last) || (last <= first && first <= mid)) {
    return first;
  }

  return last;
}

// 6. PARTITION - PHÂN CHIA MẢNG THÀNH 3 VÙNG
function partition(arr, left, right) {
  let pivot = medianOfThree(arr, left, right);

  let low = left;
  let current = left;
  let high = right;

  while (current <= high) {
    if (arr[current].price < pivot) {
      swap(arr, low, current);
      low++;
      current++;
    } else if (arr[current].price > pivot) {
      swap(arr, current, high);
      high--;
    } else {
      current++;
    }
  }

  return [low, high];
}

// 7. QUICK SORT
function quickSort(arr, left, right) {
  if (left >= right) {
    return;
  }

  let pivotRange = partition(arr, left, right);

  let low = pivotRange[0];
  let high = pivotRange[1];

  quickSort(arr, left, low - 1);
  quickSort(arr, high + 1, right);
}

// 8. LINEAR SEARCH
function linearSearchByPrice(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].price === target) {
      return i;
    }
  }

  return -1;
}

// 9. BINARY SEARCH
function binarySearch(arr, target) {
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

// 10. LEGACY - DUYỆT MẢNG LỒNG NHAU + BUBBLE SORT
function legacySearchAndSort(data, keyword) {
  let result = [];

  for (let i = 0; i < data.length; i++) {
    let products = data[i].products;

    for (let j = 0; j < products.length; j++) {
      if (products[j].name.includes(keyword)) {
        result.push(products[j]);
      }
    }
  }

  bubbleSort(result);

  return result;
}

// 11. OPTIMIZED - FLATTEN + QUICK SORT
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

// 12. TẠO DỮ LIỆU KIỂM THỬ
// Cứ 100 sản phẩm có 1 sản phẩm khớp Target.
// Tỷ lệ khớp = 1%.
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

      if (id % 100 === 0) {
        productName = "Target Product " + id;
      } else {
        productName = "Product " + id;
      }

      let price = ((id * 7919) % totalProducts) * 10 + 500;

      let product = {
        id: id,
        name: productName,
        price: price,
      };

      category.products.push(product);
      id++;
    }

    data.push(category);
  }

  return data;
}

// 13. KIỂM TRA HAI KẾT QUẢ CÓ GIỐNG NHAU KHÔNG
function compareResults(first, second) {
  if (first.length !== second.length) {
    return false;
  }

  for (let i = 0; i < first.length; i++) {
    if (first[i].id !== second[i].id || first[i].price !== second[i].price) {
      return false;
    }
  }

  return true;
}

// 14. SO SÁNH LEGACY VÀ OPTIMIZED
function benchmarkLegacyVsOptimized() {
  let testSizes = [1000, 10000, 500000];

  console.log("\n====================================");
  console.log("BENCHMARK: LEGACY VS OPTIMIZED");
  console.log("====================================");

  for (let i = 0; i < testSizes.length; i++) {
    let size = testSizes[i];
    let testData = generateMegaStore(size);

    console.log("\n------------------------------------");
    console.log("SỐ LƯỢNG SẢN PHẨM:", size);
    console.log("------------------------------------");

    console.time("Legacy - " + size);

    let legacyResult = legacySearchAndSort(testData, "Target");

    console.timeEnd("Legacy - " + size);

    console.time("Optimized - " + size);

    let optimizedResult = optimizedSearchAndSort(testData, "Target");

    console.timeEnd("Optimized - " + size);

    console.log("Số kết quả Legacy:", legacyResult.length);
    console.log("Số kết quả Optimized:", optimizedResult.length);

    console.log(
      "Hai kết quả giống nhau:",
      compareResults(legacyResult, optimizedResult),
    );
  }
}

// 15. SO SÁNH LINEAR SEARCH VÀ BINARY SEARCH
function benchmarkSearch(totalProducts) {
  let testData = generateMegaStore(totalProducts);

  let allProducts = flatten_products(testData);

  // Binary Search bắt buộc phải có mảng đã sắp xếp.
  quickSort(allProducts, 0, allProducts.length - 1);

  // Chọn giá trị lớn nhất.
  let target = allProducts[allProducts.length - 1].price;

  let repetitions = 1000;

  let linearResult = -1;
  let binaryResult = -1;

  console.log("\n------------------------------------");
  console.log("LINEAR VS BINARY:", totalProducts);
  console.log("------------------------------------");

  console.time("Linear Search x1000 - " + totalProducts);

  for (let i = 0; i < repetitions; i++) {
    linearResult = linearSearchByPrice(allProducts, target);
  }

  console.timeEnd("Linear Search x1000 - " + totalProducts);

  console.time("Binary Search x1000 - " + totalProducts);

  for (let i = 0; i < repetitions; i++) {
    binaryResult = binarySearch(allProducts, target);
  }

  console.timeEnd("Binary Search x1000 - " + totalProducts);

  console.log("Giá cần tìm:", target);
  console.log("Linear Search trả về:", linearResult);
  console.log("Binary Search trả về:", binaryResult);

  console.log(
    "Cả hai đều tìm thấy:",
    linearResult !== -1 && binaryResult !== -1,
  );
}

// 16. KIỂM TRA DỮ LIỆU MẪU
function runSampleTest() {
  console.log("====================================");
  console.log("KIỂM TRA DỮ LIỆU MẪU");
  console.log("====================================");

  let allProducts = flatten_products(mega_store);

  console.log("Số sản phẩm sau Flatten:", allProducts.length);

  quickSort(allProducts, 0, allProducts.length - 1);

  console.log("Danh sách sau Quick Sort:");
  console.log(allProducts);

  let target = allProducts[0].price;

  console.log("Giá cần tìm:", target);

  console.log("Linear Search:", linearSearchByPrice(allProducts, target));

  console.log("Binary Search:", binarySearch(allProducts, target));
}

// 17. CHẠY TOÀN BỘ CHƯƠNG TRÌNH
runSampleTest();

benchmarkLegacyVsOptimized();

benchmarkSearch(1000);
benchmarkSearch(10000);
benchmarkSearch(500000);
