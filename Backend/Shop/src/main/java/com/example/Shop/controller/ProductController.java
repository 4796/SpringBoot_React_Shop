package com.example.Shop.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.Shop.converter.impl.ProductConverterDtoEntity;
import com.example.Shop.converter.impl.WorkerConverterDtoEntity;
import com.example.Shop.dto.ProductDTO;
import com.example.Shop.dto.WorkerDTO;
import com.example.Shop.model.Product;
import com.example.Shop.model.Worker;
import com.example.Shop.service.AuthService;
import com.example.Shop.service.ProductService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import jakarta.validation.Valid;

@RestController
@CrossOrigin
@RequestMapping("/api/products")
public class ProductController {
	
	@Autowired
	private ProductService service;
	
	
	@Autowired
	AuthService authService;
	
	@Autowired
	ProductConverterDtoEntity productConverter;
	
	
	
//	@GetMapping("/")
//	public String cao() {
//		return "CAO";
//	}
	
	
	//for anyone is allright
	@GetMapping() 
	public ResponseEntity<List<Product>> getAllProducts() throws Exception{
		List<Product> l=service.getAllProducts();
		if(l==null)
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		else
			return  new ResponseEntity<>(l, HttpStatus.OK);
	}
	
	//for anyone is alright
	@GetMapping("/{id}") 
	public ResponseEntity<Product> getProduct(@PathVariable int id) throws Exception{
		Product p=service.getProduct(id);
		if (p==null)
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		else
			return  new ResponseEntity<>(p, HttpStatus.OK);
	}
	
	//worker     da
	@PostMapping() 
	public ResponseEntity<?> addProduct(@Valid @RequestBody ProductDTO dto,  @RequestHeader("Authorization") String token) throws Exception{
		Product product=null;
		try {
			String username = authService.validateTokenAndGetUser(token); 
	        if (username == null) {
	        	return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
	        }
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
		product=productConverter.toEntity(dto);
		
		Product p=service.addProduct(product);
		ProductDTO retDto=productConverter.toDto(p);
		return  new ResponseEntity<>(retDto, HttpStatus.CREATED);
	}
	
	//worker     da
	@PutMapping("/{id}") 
	public ResponseEntity<?> updateProduct(@PathVariable int id, @Valid @RequestBody ProductDTO dto,  @RequestHeader("Authorization") String token) throws Exception{
		Product product=null;
		try {
			String username = authService.validateTokenAndGetUser(token); 
	        if (username == null) 
	        	return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
		
        product= productConverter.toEntity(dto);
		product.setId(id);
		Product p=null;
		p = service.updateProduct(product);
		ProductDTO retDto=productConverter.toDto(p);
		
		return  new ResponseEntity<>(retDto, HttpStatus.OK);
	}

	//worker    da
	@DeleteMapping("/{id}") 
	public ResponseEntity<?> deleteProduct(@PathVariable int id, @RequestHeader("Authorization") String token) throws Exception{
		try {
			String username = authService.validateTokenAndGetUser(token); 
	        if (username == null) {
	        	return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
	        }
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
		
		Product p=service.getProduct(id);
		if(p==null)
			throw new Exception("Product does not exist");
		else {
			service.deleteProduct(id);
			return  new ResponseEntity<>(HttpStatus.OK);
			}	
	}
	
		//da
	@GetMapping("/search")  //http://localhost:8080/api/products/search?keyword=ef
	public ResponseEntity<List<Product>> searchProducts(@RequestParam String keyword) throws Exception{
		List<Product> l=service.searchProducts(keyword);
		if(l==null)
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		else
			return  new ResponseEntity<>(l, HttpStatus.OK);
		
	}
}
