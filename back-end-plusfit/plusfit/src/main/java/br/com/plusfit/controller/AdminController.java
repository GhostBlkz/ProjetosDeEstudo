package br.com.plusfit.controller;

import br.com.plusfit.controller.request.AdminRequestDto;
import br.com.plusfit.controller.response.AdminResponseDto;
import br.com.plusfit.model.Admin;
import br.com.plusfit.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping
    private List<AdminResponseDto> getAdmin() {
        List<AdminResponseDto> response = new ArrayList<>();
        for (Admin admin : this.adminService.findAll()) {
            response.add(new AdminResponseDto(admin));
        }
        return response;
    }

    @GetMapping("/{adminId}")
    public AdminResponseDto getById(@PathVariable Long adminId) {
        Admin admin = this.adminService.findById(adminId);
        return new AdminResponseDto(admin);
    }

    @PostMapping
    public AdminResponseDto saveAdmin(@RequestBody final AdminRequestDto adminRequestDto) {
        Admin admin = new Admin(adminRequestDto);
        admin = this.adminService.save(admin);
        return new AdminResponseDto(admin);
    }

    @DeleteMapping("/{adminId}")
    public void inactiveAdmin(@PathVariable final Long adminId) {
        adminService.inactive(adminId);
    }

    @PatchMapping("/{adminId}")
    public AdminResponseDto updateAdmin(@RequestBody final AdminRequestDto adminRequestDto, @PathVariable Long adminId) {
        return new AdminResponseDto(this.adminService.update(adminRequestDto, adminId));
    }
}
