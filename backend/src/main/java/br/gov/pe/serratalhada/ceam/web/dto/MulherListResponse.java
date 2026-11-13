package br.gov.pe.serratalhada.ceam.web.dto;
import java.util.UUID;

public record MulherListResponse(
    UUID id, 
    String nome, 
    String cpf, 
    String telefone
) {}
