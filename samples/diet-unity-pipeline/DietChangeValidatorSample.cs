using System.IO;
using UnityEngine;

namespace PortfolioSamples.DietPipeline.Editor
{
    /// <summary>
    /// 오래된 snapshot 기준 변경을 거절하는 validate/apply 흐름의 공개용 샘플입니다.
    /// </summary>
    public static class DietChangeValidatorSample
    {
        public static DietValidationReport Validate(string manifestPath, bool dryRun)
        {
            if (!File.Exists(manifestPath))
            {
                return new DietValidationReport
                {
                    rejectedCount = 1,
                    message = "change manifest not found"
                };
            }

            string json = File.ReadAllText(manifestPath);
            DietChangeManifest manifest = JsonUtility.FromJson<DietChangeManifest>(json);
            DietSnapshot current = DietSnapshot.CaptureCurrent();

            if (manifest.baseSnapshotHash != current.snapshotHash)
            {
                return new DietValidationReport
                {
                    staleSnapshot = true,
                    rejectedCount = manifest.changes?.Length ?? 0,
                    message = "stale snapshot: export again before applying changes"
                };
            }

            if (!dryRun)
            {
                // 실제 프로젝트에서는 검증 통과한 변경만 XML/asset data에 반영합니다.
                // 이 샘플에서는 공개 범위 보호를 위해 실제 파일 patch는 생략합니다.
            }

            return new DietValidationReport
            {
                acceptedCount = manifest.changes?.Length ?? 0,
                message = dryRun ? "dry-run validate passed" : "apply passed"
            };
        }
    }

    [System.Serializable]
    public sealed class DietChangeManifest
    {
        public string baseSnapshotHash;
        public DietChange[] changes;
    }

    [System.Serializable]
    public sealed class DietChange
    {
        public string changeId;
        public string table;
        public string key;
        public string field;
        public string value;
    }
}
