(function () {
    'use strict';

    function $id(id) {
        return document.getElementById(id);
    }

    function toNumber(value) {
        const n = parseFloat(value);
        return Number.isFinite(n) ? n : NaN;
    }

    const form = $id('carbonForm');
    const kmInput = $id('km');
    const co2El = $id('co2');
    const mensagemEl = $id('mensagem');
    const resultadoEl = $id('resultado');
    const manualKm = $id('manualKm');
    const kmContainer = $id('kmContainer');

    if (!form) return;

    function getSelectedFactor() {
        const checked = document.querySelector('input[name="veiculo"]:checked');
        return checked ? toNumber(checked.value) : NaN;
    }

    function showResult(value) {
        const formatted = value.toFixed(2);
        if (co2El) co2El.textContent = `${formatted} kg CO₂`;
        if (mensagemEl) mensagemEl.textContent = `Sua viagem gerou aproximadamente ${formatted} kg de CO₂ equivalente.`;
        if (resultadoEl) resultadoEl.classList.remove('hidden');
    }

    function showError(text) {
        if (mensagemEl) mensagemEl.textContent = text;
        if (resultadoEl) resultadoEl.classList.add('hidden');
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const km = toNumber(kmInput ? kmInput.value : NaN);
        const fator = getSelectedFactor();

        if (Number.isNaN(km) || km <= 0) {
            showError('Por favor informe uma distância válida (km).');
            return;
        }

        if (Number.isNaN(fator)) {
            showError('Por favor selecione o modo de transporte.');
            return;
        }

        const emissao = km * fator;
        showResult(emissao);
    });

    if (manualKm && kmInput) {
        // garantir estado inicial (HTML já define disabled, mas mantemos coerência)
        kmInput.disabled = !manualKm.checked;
        kmInput.required = manualKm.checked;

        manualKm.addEventListener('change', function () {
            const checked = this.checked;
            kmInput.disabled = !checked;
            kmInput.required = checked;
            if (checked) kmInput.focus();
        });
    }
})();