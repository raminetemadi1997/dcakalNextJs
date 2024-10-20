"use client";
import styles from "@/assets/css/Invoice.module.css";

export default function Invoice(params) {
  return (
    <section className="w-full mb-4 px-4">
      <section className="grid grid-cols-3">
        <div></div>
        <div className="flex gap-2 items-center justify-center">
          <div className="underline">فاکتور فروش</div>
          <div className="underline">کالا و خدمات</div>
        </div>
        <div>
          <div className="flex gap-2 items-center justify-end">
            <div>شماره فاکتور:</div>
            <div className="border border-b-0 border-black p-1 w-24 text-center">
              68845
            </div>
          </div>
          <div className="flex gap-2 items-center justify-end">
            <div>تاریخ:</div>
            <div className="border border-b-0 border-black p-1 w-24 text-center">
              1401/10/03
            </div>
          </div>
        </div>
      </section>

      <section className="border border-black">
        <div className="text-center p-1 border-b border-black last:border-b-0">
          مشخصات فروشنده
        </div>

        <div className="p-1 border-b border-black grid grid-cols-3 gap-4 last:border-b-0">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <div>نام شخص حقیقی / حقوقی:</div>
              <div>دی سی ای کالا</div>
            </div>
            <div className="flex gap-2 items-center">
              <div>شماره تلفن / نمابر:</div>
              <div>77132831-2</div>
            </div>
            <div className="flex gap-2 items-center">
              <div>نشانی:</div>
              <div>بزرگراه رسالت - بین چهارراه سرسبز و دردشت - پلاک 675</div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center justify-between">
              <div>شماره اقتصادی:</div>
              <div>
                <table className={styles.table}>
                  <tr className={styles.tr}>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                    <td>5</td>
                    <td>6</td>
                    <td>7</td>
                    <td>8</td>
                    <td>9</td>
                    <td>10</td>
                  </tr>
                </table>
              </div>
            </div>
            <div className="flex gap-2 items-center justify-between">
              <div>کدپستی 10 رقمی:</div>
              <div>
                <table className={styles.table}>
                  <tr className={styles.tr}>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                    <td>5</td>
                    <td>6</td>
                    <td>7</td>
                    <td>8</td>
                    <td>9</td>
                    <td>10</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center justify-between">
              <div>شماره ثبت / شماره ملی:</div>
              <div>
                <table className={styles.table}>
                  <tr className={styles.tr}>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                    <td>5</td>
                    <td>6</td>
                    <td>7</td>
                    <td>8</td>
                    <td>9</td>
                    <td>10</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center p-1 border-b border-black last:border-b-0">
          مشخصات خریدار
        </div>

        <div className="p-1 border-b border-black grid grid-cols-3 gap-4 last:border-b-0">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <div>نام شخص حقیقی / حقوقی:</div>
              <div>اینترنتی</div>
            </div>
            <div className="flex gap-2 items-center">
              <div>شماره تلفن / نمابر:</div>
              <div></div>
            </div>
            <div className="flex gap-2 items-center">
              <div>نشانی:</div>
              <div></div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <div>شماره اقتصادی:</div>
              <div></div>
            </div>
            <div className="flex gap-2 items-center">
              <div>کدپستی 10 رقمی:</div>
              <div></div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <div>شماره ثبت / شماره ملی:</div>
              <div></div>
            </div>
          </div>
        </div>

        <div className="text-center p-1 border-b border-black last:border-b-0">
          مشخصات کالا یا خدمات مورد معامله (کلیه مبالغ به ریال میباشد)
        </div>

        <div className="border-b border-black grid grid-cols-22 last:border-b-0">
          <div className="text-center text-sm border-l border-black p-1 last:border-l-0">
            ردیف
          </div>
          <div className="col-span-2 text-center text-sm border-l border-black p-1 last:border-l-0">
            کد کالا
          </div>
          <div className="col-span-4 text-center text-sm border-l border-black p-1 last:border-l-0">
            شرح حالا یا خدمات
          </div>
          <div className="text-center text-sm border-l border-black p-1 last:border-l-0">
            تعداد
          </div>
          
          <div className="col-span-2 text-center text-sm border-l border-black p-1 last:border-l-0">
            مبلغ واحد
          </div>
          <div className="col-span-2 text-center text-sm border-l border-black p-1 last:border-l-0">
            مبلغ کل
          </div>
          <div className="col-span-2 text-center text-sm border-l border-black p-1 last:border-l-0">
            مبلغ تخفیف
          </div>
          <div className="col-span-3 text-center text-sm border-l border-black p-1 last:border-l-0">
            مبلغ کل پس از کسر تخفیف
          </div>
          <div className="col-span-2 text-center text-sm border-l border-black p-1 last:border-l-0">
            جمع مالیات
          </div>
          <div className="col-span-3 text-center text-sm border-l border-black p-1 last:border-l-0">
            جمع مبلغ کل با مالیات
          </div>
        </div>

        <div className="border-b border-black grid grid-cols-22 last:border-b-0">
          <div className="text-center text-sm border-l border-black p-1 last:border-l-0">
            1
          </div>
          <div className="col-span-2 text-center text-sm border-l border-black p-1 last:border-l-0">
            01001005
          </div>
          <div className="col-span-4 text-center text-sm border-l border-black p-1 last:border-l-0">
            قفل لادری تابا
          </div>
          <div className="text-center text-sm border-l border-black p-1 last:border-l-0">
            1
          </div>
          
          <div className="col-span-2 text-center text-sm border-l border-black p-1 last:border-l-0">
            {Number(2700000).toLocaleString()}
          </div>
          <div className="col-span-2 text-center text-sm border-l border-black p-1 last:border-l-0">
            {Number(2700000).toLocaleString()}
          </div>
          <div className="col-span-2 text-center text-sm border-l border-black p-1 last:border-l-0">
            -
          </div>
          <div className="col-span-3 text-center text-sm border-l border-black p-1 last:border-l-0">
            {Number(2700000).toLocaleString()}
          </div>
          <div className="col-span-2 text-center text-sm border-l border-black p-1 last:border-l-0">
            -
          </div>
          <div className="col-span-3 text-center text-sm border-l border-black p-1 last:border-l-0">
            {Number(2700000).toLocaleString()}
          </div>
        </div>

        <div className="border-b border-black grid grid-cols-22 last:border-b-0">
          <div className="text-center text-sm border-l border-black p-1 last:border-l-0">
            2
          </div>
          <div className="col-span-2 text-center text-sm border-l border-black p-1 last:border-l-0">
            1317101
          </div>
          <div className="col-span-4 text-center text-sm border-l border-black p-1 last:border-l-0">
            تغذیه ریموت قفل برقی بتا
          </div>
          <div className="text-center text-sm border-l border-black p-1 last:border-l-0">
            1
          </div>
          
          <div className="col-span-2 text-center text-sm border-l border-black p-1 last:border-l-0">
            {Number(4250000).toLocaleString()}
          </div>
          <div className="col-span-2 text-center text-sm border-l border-black p-1 last:border-l-0">
            {Number(4250000).toLocaleString()}
          </div>
          <div className="col-span-2 text-center text-sm border-l border-black p-1 last:border-l-0">
            -
          </div>
          <div className="col-span-3 text-center text-sm border-l border-black p-1 last:border-l-0">
            {Number(4250000).toLocaleString()}
          </div>
          <div className="col-span-2 text-center text-sm border-l border-black p-1 last:border-l-0">
            -
          </div>
          <div className="col-span-3 text-center text-sm border-l border-black p-1 last:border-l-0">
            {Number(4250000).toLocaleString()}
          </div>
        </div>

        <div className="border-b border-black grid grid-cols-22 last:border-b-0">
          <div className="text-center text-sm border-l border-black p-1 last:border-l-0">
            3
          </div>
          <div className="col-span-2 text-center text-sm border-l border-black p-1 last:border-l-0">
            01006002
          </div>
          <div className="col-span-4 text-center text-sm border-l border-black p-1 last:border-l-0">
            قفل برقی یوتاب 1093
          </div>
          <div className="text-center text-sm border-l border-black p-1 last:border-l-0">
            1
          </div>
          
          <div className="col-span-2 text-center text-sm border-l border-black p-1 last:border-l-0">
            {Number(6990000).toLocaleString()}
          </div>
          <div className="col-span-2 text-center text-sm border-l border-black p-1 last:border-l-0">
            {Number(6990000).toLocaleString()}
          </div>
          <div className="col-span-2 text-center text-sm border-l border-black p-1 last:border-l-0">
            -
          </div>
          <div className="col-span-3 text-center text-sm border-l border-black p-1 last:border-l-0">
            {Number(6990000).toLocaleString()}
          </div>
          <div className="col-span-2 text-center text-sm border-l border-black p-1 last:border-l-0">
            -
          </div>
          <div className="col-span-3 text-center text-sm border-l border-black p-1 last:border-l-0">
            {Number(6990000).toLocaleString()}
          </div>
        </div>

        <div className="border-b border-black grid grid-cols-22 last:border-b-0">
          <div className="text-center text-sm border-l border-black p-1 last:border-l-0">
            4
          </div>
          <div className="col-span-2 text-center text-sm border-l border-black p-1 last:border-l-0">
            01006002
          </div>
          <div className="col-span-4 text-center text-sm border-l border-black p-1 last:border-l-0">
            قفل برقی یوتاب 1093
          </div>
          <div className="text-center text-sm border-l border-black p-1 last:border-l-0">
            1
          </div>
          
          <div className="col-span-2 text-center text-sm border-l border-black p-1 last:border-l-0">
            {Number(6990000).toLocaleString()}
          </div>
          <div className="col-span-2 text-center text-sm border-l border-black p-1 last:border-l-0">
            {Number(6990000).toLocaleString()}
          </div>
          <div className="col-span-2 text-center text-sm border-l border-black p-1 last:border-l-0">
            -
          </div>
          <div className="col-span-3 text-center text-sm border-l border-black p-1 last:border-l-0">
            {Number(6990000).toLocaleString()}
          </div>
          <div className="col-span-2 text-center text-sm border-l border-black p-1 last:border-l-0">
            -
          </div>
          <div className="col-span-3 text-center text-sm border-l border-black p-1 last:border-l-0">
            {Number(6990000).toLocaleString()}
          </div>
        </div>

        <div className="border-b border-black grid grid-cols-22 last:border-b-0">
          <div className="text-center text-sm border-l border-black p-1 last:border-l-0">
            5
          </div>
          <div className="col-span-2 text-center text-sm border-l border-black p-1 last:border-l-0">
            01006002
          </div>
          <div className="col-span-4 text-center text-sm border-l border-black p-1 last:border-l-0">
            قفل برقی یوتاب 1093
          </div>
          <div className="text-center text-sm border-l border-black p-1 last:border-l-0">
            1
          </div>
          
          <div className="col-span-2 text-center text-sm border-l border-black p-1 last:border-l-0">
            {Number(6990000).toLocaleString()}
          </div>
          <div className="col-span-2 text-center text-sm border-l border-black p-1 last:border-l-0">
            {Number(6990000).toLocaleString()}
          </div>
          <div className="col-span-2 text-center text-sm border-l border-black p-1 last:border-l-0">
            -
          </div>
          <div className="col-span-3 text-center text-sm border-l border-black p-1 last:border-l-0">
            {Number(6990000).toLocaleString()}
          </div>
          <div className="col-span-2 text-center text-sm border-l border-black p-1 last:border-l-0">
            -
          </div>
          <div className="col-span-3 text-center text-sm border-l border-black p-1 last:border-l-0">
            {Number(6990000).toLocaleString()}
          </div>
        </div>

        <div className="border-b border-black grid grid-cols-22 last:border-b-0">
          <div className="text-center text-sm border-l border-black p-1 last:border-l-0">
            6
          </div>
          <div className="col-span-2 text-center text-sm border-l border-black p-1 last:border-l-0">
            01006002
          </div>
          <div className="col-span-4 text-center text-sm border-l border-black p-1 last:border-l-0">
            قفل برقی یوتاب 1093
          </div>
          <div className="text-center text-sm border-l border-black p-1 last:border-l-0">
            1
          </div>
          
          <div className="col-span-2 text-center text-sm border-l border-black p-1 last:border-l-0">
            {Number(6990000).toLocaleString()}
          </div>
          <div className="col-span-2 text-center text-sm border-l border-black p-1 last:border-l-0">
            {Number(6990000).toLocaleString()}
          </div>
          <div className="col-span-2 text-center text-sm border-l border-black p-1 last:border-l-0">
            -
          </div>
          <div className="col-span-3 text-center text-sm border-l border-black p-1 last:border-l-0">
            {Number(6990000).toLocaleString()}
          </div>
          <div className="col-span-2 text-center text-sm border-l border-black p-1 last:border-l-0">
            -
          </div>
          <div className="col-span-3 text-center text-sm border-l border-black p-1 last:border-l-0">
            {Number(6990000).toLocaleString()}
          </div>
        </div>

        <div className="border-b border-black grid grid-cols-22 last:border-b-0">
          <div className="col-span-10 text-end text-sm border-l border-black p-1 last:border-l-0">
            جمع کل
          </div>
          <div className="col-span-2 text-center text-sm border-l border-black p-1 last:border-l-0">
            {Number(13940000).toLocaleString()}
          </div>
          <div className="col-span-2 text-center text-sm border-l border-black p-1 last:border-l-0">
            -
          </div>
          <div className="col-span-3 text-center text-sm border-l border-black p-1 last:border-l-0">
            {Number(13940000).toLocaleString()}
          </div>
          <div className="col-span-2 text-center text-sm border-l border-black p-1 last:border-l-0">
            -
          </div>
          <div className="col-span-3 text-center text-sm border-l border-black p-1 last:border-l-0">
            {Number(13940000).toLocaleString()}
          </div>
        </div>

        <div className="border-b border-black grid grid-cols-22 last:border-b-0">
          <div className="col-span-10 border-l border-black">
            <div className="text-start text-sm p-1 last:border-l-0 border-b  border-black">
              شرایط و نحوه فروش:
            </div>
            <div className="text-start text-sm p-1 last:border-l-0">
              توضیحات:
            </div>
          </div>
          <div className="col-span-10 flex items-center text-sm border-l border-black p-1 last:border-l-0">
            سیزده میلیون و نهصد و چهل هزار ریال
          </div>
        </div>

        <div className="border-b border-black grid grid-cols-22 last:border-b-0 py-4"></div>

        <div className="border-b border-black grid grid-cols-22 last:border-b-0">
          <div className="col-span-10 border-l border-black  p-1">
            مهر و امضا فروشنده
          </div>
          <div className="col-span-10 text-start text-sm border-l  p-1 border-black last:border-l-0">
            مهر و امضا خریدار
          </div>
        </div>
        
      </section>
    </section>
  );
}
