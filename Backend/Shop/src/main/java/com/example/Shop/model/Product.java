package com.example.Shop.model;

import java.time.LocalDate;
import java.util.Date;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Version;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Product implements GenericEntity{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String name;
	private double price;
	private String description;
	private String brand;
	private String category;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private LocalDate date;//danas
	private boolean available;//na osnovu quantity
	private int quantity; 
	private String image;
	
	
	//@PrePersist se izvršava pre nego što se objekat sačuva prvi put u bazu
	
		 @PrePersist
		    protected void onCreate() {
		        if (date == null) {
		            date = LocalDate.now();
		        }
		        if(quantity>0)
		        	available=true;
		        else
		        	available=false;
		    }
	
	
}
