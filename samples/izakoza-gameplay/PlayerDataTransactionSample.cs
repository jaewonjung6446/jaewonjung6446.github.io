using System;

namespace PortfolioSamples.IzakozaGameplay
{
    /// <summary>
    /// 공개 포트폴리오용 축약 샘플입니다.
    /// 상용 프로젝트 원본 코드는 포함하지 않습니다.
    /// </summary>
    public sealed class PlayerDataTransactionSample
    {
        private PlayerData _current = new PlayerData();
        private readonly IPlayerDataStore _store;

        public PlayerDataTransactionSample(IPlayerDataStore store)
        {
            _store = store ?? throw new ArgumentNullException(nameof(store));
        }

        public SaveResult RunTransaction(string reason, Action<PlayerData> applyChanges)
        {
            if (applyChanges == null)
                return SaveResult.Fail("applyChanges is null");

            PlayerData snapshot = _current.Clone();

            try
            {
                applyChanges.Invoke(_current);
                _current.Normalize();
            }
            catch (Exception ex)
            {
                _current = snapshot;
                return SaveResult.Fail($"Change failed: {reason} / {ex.Message}");
            }

            SaveResult saveResult = _store.Save(_current);
            if (saveResult.Success)
                return saveResult;

            _current = snapshot;
            return SaveResult.Fail($"Save failed and rolled back: {reason}");
        }
    }

    public interface IPlayerDataStore
    {
        SaveResult Save(PlayerData data);
    }

    public sealed class PlayerData
    {
        public int Day { get; set; } = 1;
        public string PendingCombatKey { get; set; } = string.Empty;

        public PlayerData Clone()
        {
            return new PlayerData
            {
                Day = Day,
                PendingCombatKey = PendingCombatKey
            };
        }

        public void Normalize()
        {
            if (Day < 1)
                Day = 1;

            PendingCombatKey ??= string.Empty;
        }
    }

    public readonly struct SaveResult
    {
        public bool Success { get; }
        public string Message { get; }

        private SaveResult(bool success, string message)
        {
            Success = success;
            Message = message;
        }

        public static SaveResult Ok(string message = "ok") => new(true, message);
        public static SaveResult Fail(string message) => new(false, message);
    }
}
