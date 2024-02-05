package com.dill.library.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dill.library.entity.BookEntity;
import com.dill.library.repository.BookRepository;

import lombok.Data;

@Service
@Data
public class BookService {

	@Autowired
	private BookRepository bookRepository;
	
	public Optional<BookEntity> getBook(final Long id) {
        return bookRepository.findById(id);
    }

    public Iterable<BookEntity> getBooks() {
        return bookRepository.findAll();
    }

    public void deleteBook(final Long id) {
        bookRepository.deleteById(id);
    }

    public BookEntity saveBook(BookEntity book) {
    	BookEntity savedBook = bookRepository.save(book);
        return savedBook;
    }

}
