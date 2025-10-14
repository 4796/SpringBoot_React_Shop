package com.example.Shop.model;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "customer_order")
public class Order implements GenericEntity{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	@ManyToOne 
    @JoinColumn(name = "client_username", referencedColumnName = "username", nullable = false)
	private Client client;
	@ManyToOne 
    @JoinColumn(name = "product_id", referencedColumnName = "id", nullable = false)
	private Product product;
	private String adress;
	private boolean delivered;
	//@PrePersist se izvršava pre nego što se objekat sačuva prvi put u bazu
	
		 @PrePersist
		    protected void onCreate() {
		            delivered = false;
		    }
		 
		 
	@Override
	public String toString() {
		return "Order [client=" + client + ", product=" + product + ", adress=" + adress + "]";
	}
	
	
}
