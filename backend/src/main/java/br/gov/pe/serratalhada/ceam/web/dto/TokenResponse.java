package br.gov.pe.serratalhada.ceam.web.dto;

public record TokenResponse(String token, String tipo, UsuarioResponse usuario) {}
