using System;
using System.Collections.Generic;

namespace PortfolioSamples.IzakozaGameplay
{
    /// <summary>
    /// 인카운터 보상 지급과 완료 기록을 같은 확정 흐름으로 묶는 공개용 샘플입니다.
    /// </summary>
    public sealed class EncounterRewardFlowSample
    {
        private readonly PlayerDataTransactionSample _transaction;
        private readonly PlayerItemService _items;
        private readonly HashSet<string> _completedEncounters = new();

        public EncounterRewardFlowSample(PlayerDataTransactionSample transaction, PlayerItemService items)
        {
            _transaction = transaction;
            _items = items;
        }

        public SaveResult CommitReward(string encounterKey, IReadOnlyList<RewardData> rewards)
        {
            if (string.IsNullOrWhiteSpace(encounterKey))
                return SaveResult.Fail("encounterKey is empty");

            if (_completedEncounters.Contains(encounterKey))
                return SaveResult.Fail("already completed");

            return _transaction.RunTransaction(
                reason: $"reward {encounterKey}",
                applyChanges: _ =>
                {
                    foreach (RewardData reward in rewards)
                    {
                        ApplyReward(reward);
                    }

                    if (!_completedEncounters.Add(encounterKey))
                        throw new InvalidOperationException("complete record failed");
                });
        }

        private void ApplyReward(RewardData reward)
        {
            switch (reward.Type)
            {
                case RewardType.Item:
                    if (!_items.Add(reward.Key, reward.Amount))
                        throw new InvalidOperationException($"item reward failed: {reward.Key}");
                    break;

                case RewardType.PendingCombat:
                    // 실제 프로젝트에서는 PlayerData.CurrentEncounter / PendingCombatKey에 저장합니다.
                    break;

                default:
                    throw new NotSupportedException($"unsupported reward type: {reward.Type}");
            }
        }
    }

    public readonly struct RewardData
    {
        public RewardType Type { get; init; }
        public string Key { get; init; }
        public int Amount { get; init; }
    }

    public enum RewardType
    {
        Item,
        PendingCombat
    }
}
