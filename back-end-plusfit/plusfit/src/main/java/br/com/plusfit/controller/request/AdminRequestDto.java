package br.com.plusfit.controller.request;

import br.com.plusfit.model.Admin;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AdminRequestDto {

    private Long adminId;
    private String userName;
    private String email;
    private String passWord;

    public AdminRequestDto(final Admin admin) {
        this.adminId = admin.getAdminId();
        this.userName = admin.getUserName();
        this.email = admin.getEmail();
        this.passWord = admin.getPassWord();
    }
}
