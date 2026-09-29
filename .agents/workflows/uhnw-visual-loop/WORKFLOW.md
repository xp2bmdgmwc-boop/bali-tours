---
name: uhnw-visual-loop
description: Strict 3-step iteration loop for applying and verifying visual changes in UHNW projects.
---

# UHNW Visual Iteration Loop

Этот воркфлоу описывает процесс внесения визуальных изменений в проект (Web или InDesign).

## Участники
- Инженер (Frontend или InDesign)
- Visual_QA_Director (Контроллер)

## Процесс
1. **Drafting:** Инженер пишет код/скрипт и применяет изменения (без коммита в Git).
2. **Extraction:** Инженер передает данные контроллеру:
   - *Для Web:* Скриншот через Playwright.
   - *Для InDesign:* JSON-выгрузка параметров слоев через `app.doScript`.
3. **Audit:** Visual_QA_Director анализирует данные на соответствие стандартам Cresco / Zero Friction.
4. **Correction:** Если найдены ошибки, Director выдает точные координаты/параметры. Инженер исправляет.
5. **Quality Gate:** Максимум 3 цикла (Draft -> Audit). Если не решено, процесс останавливается. 

Никаких бесконечных циклов генерации.
