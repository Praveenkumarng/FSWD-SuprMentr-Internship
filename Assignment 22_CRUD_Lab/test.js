async function runTests() {
  const baseUrl = 'http://localhost:5000/api/products';
  
  console.log('--- Starting CRUD API Tests ---');

  // 1. Create a Product
  console.log('\n[POST] Creating a new product...');
  const createRes = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Wireless Mouse',
      description: 'A high-precision wireless mouse',
      price: 29.99,
      category: 'Electronics',
      stock: 50
    })
  });
  const createData = await createRes.json();
  console.log(createData);
  
  if (!createData.success) {
    console.error('Failed to create product');
    return;
  }
  const productId = createData.data._id;

  // 2. Get All Products
  console.log('\n[GET] Fetching all products...');
  const getAllRes = await fetch(baseUrl);
  const getAllData = await getAllRes.json();
  console.log(`Found ${getAllData.count} products.`);
  
  // 3. Get Product by ID
  console.log(`\n[GET] Fetching product by ID (${productId})...`);
  const getOneRes = await fetch(`${baseUrl}/${productId}`);
  const getOneData = await getOneRes.json();
  console.log(getOneData.data.name);

  // 4. Update Product
  console.log('\n[PUT] Updating product price...');
  const updateRes = await fetch(`${baseUrl}/${productId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ price: 24.99 })
  });
  const updateData = await updateRes.json();
  console.log(`Updated price to: ${updateData.data.price}`);

  // 5. Delete Product
  console.log('\n[DELETE] Deleting product...');
  const deleteRes = await fetch(`${baseUrl}/${productId}`, {
    method: 'DELETE'
  });
  const deleteData = await deleteRes.json();
  console.log(deleteData.message);

  // 6. Verify Deletion
  console.log('\n[GET] Verifying deletion...');
  const verifyRes = await fetch(`${baseUrl}/${productId}`);
  const verifyData = await verifyRes.json();
  console.log(`Verification result: ${verifyData.message}`);
  
  console.log('\n--- All Tests Completed Successfully ---');
}

runTests();
