import {NumberDetailHeading} from './number-detail-heading'

const clsContentTitle = 'mb-2 font-medium text-lg uppercase text-yellow-600'

export const RulingNumber = () => {
  return (
    <div>
      <NumberDetailHeading label="Số chủ đạo" number="8" />
      <div className="grid gap-8 mt-6">
        <div>
          <div className={clsContentTitle}>Đặc điểm nổi bật</div>
          <div className="grid gap-4">
            <p>
              Người số 8 nổi bật lên với tính cách độc lập mạnh mẽ nên họ thường
              là chỗ dựa đáng tin cậy cho người khác.
            </p>

            <p>
              Người số 8 rất kín đáo khi thể hiện cảm xúc hay tình cảm nên họ
              hay được mọi người nhìn nhận là một người lạnh lùng, thờ ơ, lạnh
              nhạt. Nhưng đây không phải là họ cố tình như vậy mà tính cách của
              họ như vậy.
            </p>

            <p>
              Người số 8 rất khó mở lời bày tỏ yêu thương hay lòng biết ơn với
              người khác, với họ một lời “Cám ơn” cũng sẽ khó nói hơn là những
              người khác.
            </p>

            <p>
              Mặc dù khó bày tỏ lời yêu thương hay lòng biết ơn với người khác
              nhưng bên trong con người Số 8 có một lòng trắc ẩn và cảm thông vô
              hạn với những người có hoàn cảnh kém may mắn hơn mình.
            </p>

            <p>
              Người số 8 kiểm soát cảm xúc rất tốt nên họ thường không để cảm
              xúc ảnh hưởng đến quyết định của mình, nhờ vậy mà trong công việc
              họ thường ở các vị trí quản lý cao cấp mà thường họ có thể sẽ hoàn
              thành xuất sắc nhiệm vụ.
            </p>
          </div>
        </div>

        <div>
          <div className={clsContentTitle}>ĐỀ XUẤT HƯỚNG PHÁT TRIỂN</div>
          <div className="grid gap-2">
            <p>
              Người Số 8 cần học cách bày tỏ tình cảm và lòng biết ơn với những
              người yêu thương xung quanh họ.
            </p>

            <p>
              Người Số 8 có sự khôn ngoan bẩm sinh, nên điều quan trọng nhất là
              họ nhận ra rằng họ có điểm yếu là khó bày tỏ thì họ sẽ tự biết
              cách khắc phục.
            </p>

            <p>
              Có thể tìm đọc những cuốn sách về “Lòng biết ơn” để luyện tập. Khi
              Số 8 học được cách biểu lộ cảm xúc thì mức độ hạnh phúc của họ sẽ
              được cải thiện nhiều.
            </p>

            <p>
              Sự phát triển của việc thể hiện cảm xúc sẽ kéo theo sự phát triển
              về trí tuệ và nhiều khía cạnh khác trong cuộc sống của người Số 8
              sẽ đều trở nên tốt đẹp hơn.
            </p>

            <p>
              Người số 8 có năng lực làm việc ở những vị trí cấp quản lý. Họ có
              khả năng am hiểm các vấn đề về tài chính, ngân hàng, chứng khoán,
              hoạt động thương mại hay Kinh doanh.
            </p>
          </div>
        </div>

        <div>
          <div className={clsContentTitle}>TÓM LẠI</div>
          <div>
            <p>
              Người Số 8 thường rất độc lập, cực kỳ đáng tin cậy, tự tin, ít
              chịu bày tỏ tình cảm, giàu lòng trắc ẩn và cảm thông, hợp với các
              hoạt động thương mại, tài chính.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
