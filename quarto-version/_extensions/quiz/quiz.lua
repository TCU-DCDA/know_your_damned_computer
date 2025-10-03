-- Simple quiz filter for Quarto
-- Converts special div syntax to interactive quizzes

function Div(el)
  if el.classes:includes("quiz") then
    -- Extract quiz content
    local quiz_id = el.attributes.id or "quiz-" .. math.random(1000, 9999)
    local question = ""
    local options = {}
    local correct_index = 0
    local feedback_correct = ""
    local feedback_incorrect = ""

    -- Build HTML structure
    local html = string.format([[
<div class="quiz-container" id="%s">
  <div class="quiz-question">%s</div>
  <form class="quiz-options">
]], quiz_id, question)

    -- Add options (would parse from div content)
    html = html .. [[
  </form>
  <div class="quiz-feedback"></div>
</div>
<script>
(function() {
  const quiz = document.getElementById(']] .. quiz_id .. [[');
  const form = quiz.querySelector('.quiz-options');
  const feedback = quiz.querySelector('.quiz-feedback');

  form.addEventListener('change', function(e) {
    const selected = form.querySelector('input:checked');
    if (selected && selected.value === 'correct') {
      feedback.innerHTML = '<div class="feedback-correct">✅ Correct!</div>';
    } else {
      feedback.innerHTML = '<div class="feedback-incorrect">❌ Try again</div>';
    }
  });
})();
</script>
]]

    return pandoc.RawBlock('html', html)
  end
  return el
end
