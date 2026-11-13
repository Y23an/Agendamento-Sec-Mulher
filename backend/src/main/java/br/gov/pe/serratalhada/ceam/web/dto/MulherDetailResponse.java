package br.gov.pe.serratalhada.ceam.web.dto;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public record MulherDetailResponse(
    UUID id, 
    String nome, 
    String cpf, 
    String rg, 
    LocalDate dataNascimento, 
    String telefone, 
    String enderecoLogradouro, 
    String numero,
    DominioResponse bairro, 
    DominioResponse profissao,
    List<AtendimentoResponse> atendimentos
) {}
