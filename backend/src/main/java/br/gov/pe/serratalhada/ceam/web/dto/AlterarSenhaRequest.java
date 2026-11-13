package br.gov.pe.serratalhada.ceam.web.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record AlterarSenhaRequest(
    @NotBlank String senhaAtual,
    @NotBlank @Size(min = 6, message = "A nova senha deve ter pelo menos 6 caracteres") String novaSenha,
    @NotBlank String confirmarSenha
) {}
