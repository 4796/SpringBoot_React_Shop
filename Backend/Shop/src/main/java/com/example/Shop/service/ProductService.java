package com.example.Shop.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Shop.db.ProductRepo;
import com.example.Shop.model.Product;

import jakarta.transaction.Transactional;

@Service
public class ProductService {

	@Autowired
	private ProductRepo repo;
	
	public List<Product> getAllProducts() throws Exception{
		return repo.findAll();
	}

	public Product getProduct(int id)  throws Exception{

		return repo.findById(id).orElse(null);
	}

	@Transactional
	public Product addProduct(Product product) throws Exception {
		product.setDate(LocalDate.now());
		if(product.getQuantity()<1)
			product.setAvailable(false);
		return repo.save(product);
	}

	@Transactional
	public Product updateProduct(Product product) throws Exception {
		if(product.getQuantity()<0)
			throw new Exception("Invalid value for quantity");
		if(product.getQuantity()<1)
			product.setAvailable(false);
		else
			product.setAvailable(true);
		product.setDate(LocalDate.now());
		return repo.save(product);
	}

	@Transactional
	public void deleteProduct(int id) throws Exception {
		try {
			repo.deleteById(id);
			repo.flush();
		} catch (Exception e) {
			System.out.println(e.getMessage());
			if(e.getMessage().contains("Cannot delete or update a parent row")) {
				System.out.println("??");
				throw new Exception("Can't delete the product, there are orders or products in cart for this product.");
				
			}System.out.println("AAAAAAAA");
				throw e;
		}
		
		
		
	}

	public List<Product> searchProducts(String keyword) throws Exception{
		return repo.searchProducts(keyword);
	}

}
