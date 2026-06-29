using System;
using System.IO;
using UnityEditor;
using UnityEngine;

namespace PortfolioSamples.DietPipeline.Editor
{
    /// <summary>
    /// Unity 내부 데이터를 외부 편집 계약으로 내보내고, 변경 요청을 검증 후 적용하는 공개용 샘플입니다.
    /// </summary>
    public static class DesignerDataPipelineSample
    {
        private const string ExportDir = "_diet/exports";
        private const string RequestPath = "_diet/requests/change_manifest.json";
        private const string ReportPath = "_diet/reports/validate_report.json";

        [MenuItem("Tools/DIET Sample/Export")]
        public static void Export()
        {
            Directory.CreateDirectory(ExportDir);

            DietSnapshot snapshot = DietSnapshot.CaptureCurrent();
            File.WriteAllText(Path.Combine(ExportDir, "diet_snapshot.json"), JsonUtility.ToJson(snapshot, true));
            File.WriteAllText(Path.Combine(ExportDir, "diet_schema.json"), "{ }\n");
            File.WriteAllText(Path.Combine(ExportDir, "diet_relations.json"), "{ }\n");

            AssetDatabase.Refresh();
            Debug.Log("DIET sample export completed.");
        }

        [MenuItem("Tools/DIET Sample/Validate")]
        public static void Validate()
        {
            DietValidationReport report = DietChangeValidatorSample.Validate(RequestPath, dryRun: true);
            WriteReport(report);
        }

        [MenuItem("Tools/DIET Sample/Apply")]
        public static void Apply()
        {
            DietValidationReport report = DietChangeValidatorSample.Validate(RequestPath, dryRun: false);
            WriteReport(report);
        }

        private static void WriteReport(DietValidationReport report)
        {
            Directory.CreateDirectory(Path.GetDirectoryName(ReportPath));
            File.WriteAllText(ReportPath, JsonUtility.ToJson(report, true));
            AssetDatabase.Refresh();
        }
    }

    [Serializable]
    public sealed class DietSnapshot
    {
        public string snapshotHash;
        public string exportedAtUtc;

        public static DietSnapshot CaptureCurrent()
        {
            string timestamp = DateTime.UtcNow.ToString("O");
            return new DietSnapshot
            {
                exportedAtUtc = timestamp,
                snapshotHash = Hash128.Compute(timestamp).ToString()
            };
        }
    }

    [Serializable]
    public sealed class DietValidationReport
    {
        public bool staleSnapshot;
        public int acceptedCount;
        public int rejectedCount;
        public string message;
    }
}
