package br.com.plusfit.model;

import br.com.plusfit.controller.request.AdminRequestDto;
import br.com.plusfit.controller.request.CustomerRequestDto;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Table(name = "admin")
@NoArgsConstructor
@Data
@Entity
public class Admin {

    @Id
    @Column(name="idt_admin")
    @GeneratedValue(generator = "ADMIN_SEQUENCE")
    @SequenceGenerator(name = "ADMIN_SEQUENCE", sequenceName = "ADMIN_SEQUENCE", allocationSize = 1)
    private Long adminId;

    @Column(name="des_username")
    private String userName;

    @Column(name="des_email")
    private String email;

    @Column(name="des_password")
    private String passWord;

    @Version
    @Column(name="num_version")
    private Integer version;

    @Column(name="dat_creation")
    private LocalDateTime creationDate;

    @Column(name="dat_update")
    private LocalDateTime updateDate;

    @Column(name="flg_active")
    private Boolean active;

    public Admin (final AdminRequestDto adminRequestDto) {
        this.adminId = adminRequestDto.getAdminId();
        this.userName = adminRequestDto.getUserName();
        this.email = adminRequestDto.getEmail();
        this.passWord = adminRequestDto.getPassWord();
        this.creationDate = LocalDateTime.now();
        this.updateDate = LocalDateTime.now();
        this.active = true;
    }
}
