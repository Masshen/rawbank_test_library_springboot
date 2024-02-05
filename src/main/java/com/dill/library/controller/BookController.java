package com.dill.library.controller;

import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.dill.library.entity.BookEntity;
import com.dill.library.service.BookService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/books")
public class BookController {

	@Autowired
	private BookService bookService;
	
	@GetMapping()
	public Iterable<BookEntity> all() {
		return bookService.getBooks();
	}
	
	@GetMapping("{id}")
	public Optional<BookEntity> show(@PathVariable("id") Long id) {
		return bookService.getBook(id);
	}
	
	@DeleteMapping("{id}")
	public void delete(@PathVariable("id") Long id) {
		bookService.deleteBook(id);
	}
	
	@PostMapping()
	public BookEntity store(@RequestBody BookEntity book) {
		book.setUpdatedAt(new Date());
		book.setCreatedAt(new Date());
		return bookService.saveBook(book);
	}
	
	@PutMapping("{id}")
	public BookEntity update(@PathVariable("id") Long id,@RequestBody BookEntity book) {
		Optional<BookEntity> e = bookService.getBook(id);
		if(e.isPresent()) {
			BookEntity currentBook = e.get();
			
			String title = book.getTitle();
			String summary = book.getSummary();
			String category = book.getCategory();
			
			if(title!=null)currentBook.setTitle(title);
			if(summary!=null)currentBook.setSummary(summary);
			if(category!=null)currentBook.setCategory(category);
			currentBook.setUpdatedAt(new Date());
			bookService.saveBook(currentBook);
			return currentBook;
		} else {
			return null;
		}
	}
}
