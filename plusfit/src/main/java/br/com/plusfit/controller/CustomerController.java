package br.com.plusfit.controller;

import br.com.plusfit.controller.request.CustomerRequestDto;
import br.com.plusfit.controller.response.CustomerResponseDto;
import br.com.plusfit.model.Customer;
import br.com.plusfit.service.CustomerService;
import lombok.extern.log4j.Log4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("customer")
public class CustomerController {


    @Autowired
    private CustomerService customerService;

    @GetMapping(produces = "application/json")
    private List<CustomerResponseDto> getCustomer() {
        List<CustomerResponseDto> response = new ArrayList<>();
        for (Customer customer : this.customerService.findAll()) {
            response.add(new CustomerResponseDto(customer));
        }
        return response;
    }

    @PostMapping
    public CustomerResponseDto saveCustomer(@RequestBody final CustomerRequestDto customerRequestDto) {
        Customer customer = new Customer(customerRequestDto);
        customer = this.customerService.save(customer);
        return new CustomerResponseDto(customer);
    }
}