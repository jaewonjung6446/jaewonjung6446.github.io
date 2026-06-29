using System;
using System.Collections.Generic;

namespace PortfolioSamples.IzakozaGameplay
{
    /// <summary>
    /// 상점 구매의 검증 -> 결제 차감 -> 아이템 지급 -> 저장 확정 흐름을 보여주는 공개용 샘플입니다.
    /// </summary>
    public sealed class ShopPurchaseFlowSample
    {
        private readonly PlayerDataTransactionSample _transaction;
        private readonly PlayerItemService _items;

        public ShopPurchaseFlowSample(PlayerDataTransactionSample transaction, PlayerItemService items)
        {
            _transaction = transaction;
            _items = items;
        }

        public PurchaseResult TryPurchase(ShopStock stock, IReadOnlyList<string> paymentItemKeys)
        {
            if (stock == null)
                return PurchaseResult.Fail("stock is null");

            if (!_items.CanAdd(stock.ItemKey, 1))
                return PurchaseResult.Fail("inventory slot is full");

            if (!_items.HasAll(paymentItemKeys))
                return PurchaseResult.Fail("not enough payment items");

            SaveResult result = _transaction.RunTransaction(
                reason: $"purchase {stock.ItemKey}",
                applyChanges: _ =>
                {
                    foreach (string paymentKey in paymentItemKeys)
                    {
                        if (!_items.Remove(paymentKey, 1))
                            throw new InvalidOperationException($"payment remove failed: {paymentKey}");
                    }

                    if (!_items.Add(stock.ItemKey, 1))
                        throw new InvalidOperationException($"purchase add failed: {stock.ItemKey}");
                });

            return result.Success
                ? PurchaseResult.Ok()
                : PurchaseResult.Fail(result.Message);
        }
    }

    public sealed class PlayerItemService
    {
        private readonly Dictionary<string, int> _items = new();
        private const int MaxSlots = 24;

        public bool HasAll(IReadOnlyList<string> keys)
        {
            Dictionary<string, int> required = new();
            foreach (string key in keys)
            {
                required.TryGetValue(key, out int count);
                required[key] = count + 1;
            }

            foreach (var pair in required)
            {
                if (!_items.TryGetValue(pair.Key, out int current) || current < pair.Value)
                    return false;
            }

            return true;
        }

        public bool CanAdd(string key, int count)
        {
            return _items.ContainsKey(key) || _items.Count < MaxSlots;
        }

        public bool Add(string key, int count)
        {
            if (!CanAdd(key, count))
                return false;

            _items.TryGetValue(key, out int current);
            _items[key] = current + count;
            return true;
        }

        public bool Remove(string key, int count)
        {
            if (!_items.TryGetValue(key, out int current) || current < count)
                return false;

            int next = current - count;
            if (next <= 0)
                _items.Remove(key);
            else
                _items[key] = next;

            return true;
        }
    }

    public sealed class ShopStock
    {
        public string ItemKey { get; init; } = string.Empty;
    }

    public readonly struct PurchaseResult
    {
        public bool Success { get; }
        public string Reason { get; }

        private PurchaseResult(bool success, string reason)
        {
            Success = success;
            Reason = reason;
        }

        public static PurchaseResult Ok() => new(true, string.Empty);
        public static PurchaseResult Fail(string reason) => new(false, reason);
    }
}
