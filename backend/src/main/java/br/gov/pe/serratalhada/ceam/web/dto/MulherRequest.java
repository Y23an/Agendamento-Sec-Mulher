package br.gov.pe.serratalhada.ceam.web.dto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.br.CPF;
import java.time.LocalDate;

public record MulherRequest(
    @NotBlank String nome,
    @NotBlank @CPF String cpf,
    String rg,
    LocalDate dataNascimento,
    String telefone,
    String enderecoLogradouro,
    String numero,
    @NotNull Long bairroId,
    @NotNull Long profissaoId
) {}
