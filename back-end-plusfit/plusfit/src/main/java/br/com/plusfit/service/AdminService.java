package br.com.plusfit.service;

import br.com.plusfit.controller.request.AdminRequestDto;
import br.com.plusfit.controller.request.CustomerRequestDto;
import br.com.plusfit.model.Admin;
import br.com.plusfit.model.Customer;
import br.com.plusfit.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public Admin save(final Admin admin) {
        return this.adminRepository.save(admin);
    }

    public Admin update(final AdminRequestDto adminFromRequest, Long adminId) {
        Admin adminFromDatabase = adminRepository.findByAdminId(adminId);

        adminFromDatabase.setUserName(adminFromRequest.getUserName());
        adminFromDatabase.setEmail(adminFromRequest.getEmail());
        adminFromDatabase.setPassWord(adminFromRequest.getPassWord());

        // this.customerMapper.updateCustomerFromDto(customerFromRequest, customerFromDatabase);        // Passando as informacoes novas do fromrequest para o customerfromdatabase (informacoes velhas)
        return this.adminRepository.save(adminFromDatabase);
    }

    public List<Admin> findAll() {

        return this.adminRepository.findAll();
    }

    public Admin findById(Long adminId) {
        Optional<Admin> adminOptional = this.adminRepository.findById(adminId);
        return adminOptional.orElse(null);
    }

    public void inactive(final Long adminId) {
        Admin admin = adminRepository.findByAdminId(adminId);
        admin.setActive(false);
        this.adminRepository.save(admin);
    }
}
