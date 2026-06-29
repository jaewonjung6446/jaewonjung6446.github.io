using System;
using UnityEngine;

namespace PortfolioSamples.PansoriMicrogame
{
    /// <summary>
    /// 40시간 게임잼 프로젝트의 공통 미니게임 생명주기를 축약한 공개용 샘플입니다.
    /// </summary>
    public interface IMicrogame
    {
        string GameName { get; }
        event Action<MicrogameResult> ResultReported;
        void StartGame(MicrogameContext context);
        void StopGame();
    }

    public abstract class MicrogameBase : MonoBehaviour, IMicrogame
    {
        private bool _ended;
        protected MicrogameContext Context { get; private set; }

        public abstract string GameName { get; }
        public event Action<MicrogameResult> ResultReported;

        public virtual void StartGame(MicrogameContext context)
        {
            _ended = false;
            Context = context;
        }

        public virtual void StopGame()
        {
            _ended = true;
        }

        protected void ReportResult(bool success)
        {
            if (_ended)
                return;

            _ended = true;
            ResultReported?.Invoke(new MicrogameResult(GameName, success));
        }
    }

    public sealed class MicrogameManager : MonoBehaviour
    {
        [SerializeField] private Transform mount;
        private IMicrogame _current;
        private GameObject _currentInstance;

        public void Play(GameObject prefab, MicrogameContext context)
        {
            if (prefab == null)
                throw new ArgumentNullException(nameof(prefab));

            CleanupCurrent();

            _currentInstance = Instantiate(prefab, mount);
            _current = _currentInstance.GetComponent<IMicrogame>();

            if (_current == null)
                throw new InvalidOperationException("Prefab does not contain IMicrogame component.");

            _current.ResultReported += OnResultReported;
            _current.StartGame(context.Normalized());
        }

        private void OnResultReported(MicrogameResult result)
        {
            // 실제 프로젝트에서는 점수, 목숨, 무대 반응 UI, 다음 미니게임 전환으로 이어집니다.
            Debug.Log($"Microgame finished: {result.GameName} / success={result.Success}");
            CleanupCurrent();
        }

        private void CleanupCurrent()
        {
            if (_current != null)
                _current.ResultReported -= OnResultReported;

            if (_currentInstance != null)
                Destroy(_currentInstance);

            _current = null;
            _currentInstance = null;
        }
    }

    public readonly struct MicrogameContext
    {
        public int Difficulty { get; }
        public float Speed { get; }

        public MicrogameContext(int difficulty, float speed)
        {
            Difficulty = difficulty;
            Speed = speed;
        }

        public MicrogameContext Normalized()
        {
            return new MicrogameContext(
                Mathf.Clamp(Difficulty, 1, 3),
                Mathf.Max(1.0f, Speed));
        }
    }

    public readonly struct MicrogameResult
    {
        public string GameName { get; }
        public bool Success { get; }

        public MicrogameResult(string gameName, bool success)
        {
            GameName = gameName;
            Success = success;
        }
    }
}
