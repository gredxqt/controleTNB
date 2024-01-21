package ma.emsi.transactions.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@Entity
public class Transaction {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private int amount;
	private boolean type;
	private LocalDate date;


	@ManyToOne(fetch = FetchType.EAGER)
	private Account account;

	@ManyToOne(fetch = FetchType.EAGER)
	private Category category;

	public Transaction(int amount, boolean type, LocalDate date) {
		super();
		this.amount = amount;
		this.type = type;
		this.date = date;
	}
	public int getAmount() {
		return amount;
	}
	public void setAmount(int amount) {
		this.amount = amount;
	}
	public boolean isType() {
		return type;
	}
	public void setType(boolean type) {
		this.type = type;
	}
	public LocalDate getDate() {
		return date;
	}
	public void setDate(LocalDate date) {
		this.date = date;
	}

	
}
